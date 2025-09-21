'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { getRandomEncouragement } from '@/lib/utils';
import type { BookRecommendation } from '@/lib/recommendations';

const THEMES = ['Leadership', 'Coaching', 'Self-Awareness', 'Communication', 'Créativité', 'Stratégie'];

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function OnboardingPage() {
  const [selectedThemes, setSelectedThemes] = useState<string[]>(['Leadership', 'Self-Awareness']);
  const [minutes, setMinutes] = useState(20);
  const [bookOptions, setBookOptions] = useState<BookRecommendation[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'intro',
      role: 'assistant',
      content:
        'Hello, je suis Mia 🤖. Donne-moi quelques envies et je te souffle un livre irrésistible dans tes thématiques !',
    },
  ]);
  const [chatInput, setChatInput] = useState('Peux-tu me trouver un livre axé sur le leadership collaboratif ?');
  const [chatLoading, setChatLoading] = useState(false);
  const encouragement = useMemo(() => getRandomEncouragement(), []);

  const toggleTheme = (theme: string) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((item) => item !== theme) : [...prev, theme]
    );
  };

  const fetchRecommendations = useCallback(
    async (query?: string) => {
      if (!selectedThemes.length) {
        setBookOptions([]);
        setSelectedBookId(null);
        return null;
      }

      try {
        setLoadingBooks(true);
        if (query) {
          setChatLoading(true);
        }
        setBookError(null);
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ themes: selectedThemes, query }),
        });

        if (!response.ok) {
          throw new Error('Impossible de récupérer les recommandations.');
        }

        const data = (await response.json()) as { books: BookRecommendation[]; reply?: string };
        setBookOptions(data.books);
        setSelectedBookId(data.books[0]?.id ?? null);
        return data;
      } catch (error) {
        console.error(error);
        setBookError("Oups, l'IA a besoin d'une petite pause. Réessaie dans un instant.");
        setBookOptions([]);
        setSelectedBookId(null);
        return null;
      } finally {
        setLoadingBooks(false);
        setChatLoading(false);
      }
    },
    [selectedThemes]
  );

  useEffect(() => {
    void fetchRecommendations();
  }, [fetchRecommendations]);

  const selectedBook = bookOptions.find((book) => book.id === selectedBookId) ?? null;

  const handleSendChat = async () => {
    const trimmed = chatInput.trim();
    if (!trimmed) {
      return;
    }

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };
    setChatMessages((prev) => [...prev, newUserMessage]);
    setChatInput('');

    const data = await fetchRecommendations(trimmed);
    const bestBook = data?.books?.[0];

    const assistantReply = data?.reply
      ? data.reply
      : bestBook
      ? `Je te recommande ${bestBook.title} de ${bestBook.author}. Il colle parfaitement à ton envie !`
      : "Je cherche encore la perle rare... vérifie ta connexion ou retente dans un instant.";

    const newAssistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: assistantReply,
    };

    setChatMessages((prev) => [...prev, newAssistantMessage]);
  };

  return (
    <section className="space-y-10">
      <Card tone="lavender" className="space-y-5">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight/70">Onboarding</p>
        <h2 className="text-4xl font-semibold text-midnight">Bienvenue dans ta nouvelle aventure de lecture !</h2>
        <p className="text-lg text-midnight/70">
          Configure une routine sur mesure pour nourrir ta curiosité. {encouragement}
        </p>
      </Card>

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <Card className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-midnight">Choisis tes thématiques vibrantes</h3>
            <p className="text-sm text-midnight/70">
              Combine leadership, coaching et introspection pour un mix qui te ressemble.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {THEMES.map((theme) => {
              const isSelected = selectedThemes.includes(theme);
              return (
                <label key={theme} className="group">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={isSelected}
                    onChange={() => toggleTheme(theme)}
                  />
                  <div
                    className={`rounded-3xl border border-white/60 bg-white/70 p-5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl peer-checked:bg-turquoise/40 peer-checked:shadow-dreamy`}
                  >
                    <span className="text-lg font-semibold text-midnight">{theme}</span>
                    <p className="mt-2 text-sm text-midnight/70">
                      {isSelected ? 'Ajouté à ta playlist mentale ✨' : 'Clique pour explorer cette énergie.'}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </Card>

        <Card tone="peach" className="flex h-full flex-col justify-between space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-midnight">Temps quotidien</h3>
            <p className="text-sm text-midnight/70">
              Indique le temps doux que tu veux offrir à tes lectures.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={5}
              max={90}
              value={minutes}
              onChange={(event) => setMinutes(Number(event.target.value))}
              className="flex-1 accent-turquoise"
            />
            <span className="text-3xl font-semibold text-midnight">{minutes}</span>
            <span className="text-sm text-midnight/60">min</span>
          </div>
          <p className="text-sm text-midnight/70">
            Nous t'enverrons des rappels inspirants pour maintenir ta cadence.
          </p>
        </Card>
      </div>

      <Card tone="turquoise" className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-2xl">🤖</div>
          <div>
            <h3 className="text-xl font-semibold text-midnight">Chat avec Mia</h3>
            <p className="text-sm text-midnight/70">
              Pose-lui une question pour affiner ta recherche dans les thèmes sélectionnés.
            </p>
          </div>
        </div>
        <div className="max-h-72 space-y-3 overflow-y-auto pr-1 text-sm">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <span
                className={`inline-flex max-w-[80%] rounded-2xl px-4 py-2 leading-relaxed shadow-sm transition ${
                  message.role === 'user' ? 'bg-midnight text-white' : 'bg-white/90 text-midnight'
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
          {chatLoading && (
            <div className="flex justify-start text-midnight/70">Mia réfléchit à ta prochaine pépite…</div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <input
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                void handleSendChat();
              }
            }}
            placeholder="Demande un style, une ambiance ou un besoin précis"
            className="flex-1 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm text-midnight placeholder:text-midnight/40 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <button
            type="button"
            onClick={() => void handleSendChat()}
            className="inline-flex items-center gap-2 rounded-full bg-midnight px-5 py-2 text-sm font-semibold text-white transition hover:bg-midnight/90 disabled:cursor-not-allowed disabled:bg-midnight/40"
            disabled={chatLoading || !selectedThemes.length}
          >
            Envoyer
          </button>
        </div>
      </Card>

      <Card className="space-y-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-midnight">Ton livre du moment</h3>
          <p className="text-sm text-midnight/70">
            Laisse ChatGPT composer une sélection affûtée et choisis le titre qui te fait vibrer aujourd'hui.
          </p>
        </div>
        <div className="space-y-4">
          {loadingBooks && <p className="text-sm text-midnight/60">L'IA réfléchit à tes pépites littéraires…</p>}
          {bookError && <p className="text-sm text-rose-500">{bookError}</p>}
          {!loadingBooks && !bookError && (
            <div className="grid gap-4 lg:grid-cols-2">
              {bookOptions.map((book) => {
                const isSelected = selectedBookId === book.id;
                return (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => setSelectedBookId(book.id)}
                    className={`rounded-3xl border p-5 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-turquoise/60 ${
                      isSelected
                        ? 'border-turquoise bg-turquoise/30 shadow-dreamy'
                        : 'border-white/60 bg-white/70 hover:-translate-y-1 hover:shadow-xl'
                    }`}
                  >
                    <span className="text-sm uppercase tracking-wide text-midnight/60">{book.theme}</span>
                    <h4 className="mt-2 text-lg font-semibold text-midnight">{book.title}</h4>
                    <p className="text-sm text-midnight/70">{book.author}</p>
                    <p className="mt-3 text-sm text-midnight/60">{book.description}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => void fetchRecommendations()}
            className="rounded-full border border-midnight/20 bg-white/80 px-5 py-2 text-sm font-semibold text-midnight transition hover:bg-white"
          >
            🔄 Rafraîchir les suggestions
          </button>
          <Link
            aria-disabled={!selectedBook}
            href={{
              pathname: '/dashboard',
              query: {
                minutes,
                bookTitle: selectedBook?.title,
                bookAuthor: selectedBook?.author,
                bookTheme: selectedBook?.theme,
                themes: selectedThemes.join(','),
              },
            }}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition ${
              selectedBook ? 'bg-midnight hover:bg-midnight/90' : 'pointer-events-none bg-midnight/40'
            }`}
          >
            Construis ma routine ✨
          </Link>
        </div>
        {selectedBook && (
          <p className="text-sm text-midnight/60">
            Tu pars avec <span className="font-semibold text-midnight">{selectedBook.title}</span> — une aventure {selectedBook.theme.toLowerCase()} qui promet des étincelles !
          </p>
        )}
      </Card>
    </section>
  );
}
