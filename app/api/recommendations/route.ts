import { NextResponse } from 'next/server';
import { BookRecommendation, getFallbackRecommendations } from '@/lib/recommendations';

type RecommendationPayload = {
  themes?: string[];
};

const OPENAI_MODEL = 'gpt-4o-mini';

async function requestRecommendationsFromOpenAI(themes: string[]): Promise<BookRecommendation[] | null> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const systemPrompt =
    "Tu es un conseiller littéraire spécialisé dans les routines de lecture professionnelles. Propose cinq livres inspirants en français ou anglais qui correspondent aux thématiques données. Chaque proposition doit inclure un titre, un auteur, la thématique associée et une courte raison motivante.";

  const userPrompt = `Thématiques sélectionnées : ${themes.join(', ')}. Réponds en JSON strict avec le format {"books": [{"id": string, "title": string, "author": string, "theme": string, "description": string}]}. Assure-toi de fournir exactement cinq livres uniques.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'book_recommendations',
            schema: {
              type: 'object',
              properties: {
                books: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: ['id', 'title', 'author', 'theme', 'description'],
                    properties: {
                      id: { type: 'string' },
                      title: { type: 'string' },
                      author: { type: 'string' },
                      theme: { type: 'string' },
                      description: { type: 'string' },
                    },
                  },
                  minItems: 5,
                  maxItems: 5,
                },
              },
              required: ['books'],
            },
          },
        },
      }),
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    const rawContent = result?.choices?.[0]?.message?.content;

    if (!rawContent) {
      return null;
    }

    const parsed = JSON.parse(rawContent) as { books?: BookRecommendation[] };
    const books = parsed.books;

    if (!books || books.length !== 5) {
      return null;
    }

    return books;
  } catch (error) {
    console.error('OpenAI recommendation error', error);
    return null;
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RecommendationPayload | null;
  const themes = Array.isArray(body?.themes) ? body?.themes.filter(Boolean) : [];

  if (!themes.length) {
    return NextResponse.json(
      {
        error: 'Aucune thématique fournie. Merci de sélectionner au moins une thématique.',
      },
      { status: 400 }
    );
  }

  const aiRecommendations = await requestRecommendationsFromOpenAI(themes);
  const books = aiRecommendations ?? getFallbackRecommendations(themes);

  return NextResponse.json({ books });
}

