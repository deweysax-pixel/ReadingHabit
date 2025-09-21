'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/Card';
import { Timer } from '@/components/Timer';
import { getRandomEncouragement } from '@/lib/utils';
import type { BookRecommendation } from '@/lib/recommendations';

const GUIDED_QUESTIONS = [
  'Qu’est-ce qui t’a marqué ?',
  'Quelle action vas-tu tenter demain ?',
  'Quel passage as-tu envie de partager ?',
];

export default function SessionPage() {
  const searchParams = useSearchParams();
  const [notes, setNotes] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(GUIDED_QUESTIONS[0]);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [nextOptions, setNextOptions] = useState<BookRecommendation[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const encouragement = useMemo(() => getRandomEncouragement(), []);

  const currentBook = {
    title: searchParams.get('bookTitle') ?? 'Lecture surprise',
    author: searchParams.get('bookAuthor') ?? 'Auteur mystère',
    theme: searchParams.get('bookTheme') ?? 'Inspiration',
  };

  const themesParam = searchParams.get('themes');
  const selectedThemes = useMemo(
    () => (themesParam ? themesParam.split(',').filter(Boolean) : ['Leadership']),
    [themesParam]
  );
  const rawMinutes = Number(searchParams.get('minutes'));
  const minutes = Number.isFinite(rawMinutes) && rawMinutes > 0 ? rawMinutes : 20;

  const refreshRecommendations = useCallback(async () => {
    if (!selectedThemes.length) {
      setNextOptions([]);
      return;
    }

    try {
      setIsRefreshing(true);
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themes: selectedThemes }),
      });

      if (!response.ok) {
        throw new Error('Requête invalide');
      }

      const data = (await response.json()) as { books: BookRecommendation[] };
      setNextOptions(data.books);
    } catch (error) {
      console.error(error);
      setNextOptions([]);
    } finally {
      setIsRefreshing(false);
    }
  }, [selectedThemes]);

  useEffect(() => {
    if (sessionCompleted) {
      void refreshRecommendations();
    }
  }, [refreshRecommendations, sessionCompleted]);

  const handleComplete = () => {
    setSessionCompleted(true);
  };

  return (
    <section className="space-y-10">
      <Card tone="lavender" className="space-y-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm uppercase tracking-[0.3em] text-midnight/70">Session de lecture</span>
          <h2 className="text-4xl font-semibold text-midnight">C'est ton moment focus 🌙</h2>
          <p className="text-lg text-midnight/70">{encouragement}</p>
        </div>
      </Card>

      <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-6">
          <Card tone="turquoise" className="space-y-3 text-left">
            <span className="text-sm uppercase tracking-[0.3em] text-midnight/60">Lecture en cours</span>
            <h3 className="text-2xl font-semibold text-midnight">{currentBook.title}</h3>
            <p className="text-sm text-midnight/70">{currentBook.author}</p>
            <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-midnight/70">
              {currentBook.theme}
            </span>
          </Card>
          <Timer initialMinutes={minutes} onComplete={handleComplete} />
          <button
            type="button"
            onClick={() => {
              setSessionCompleted(true);
              void refreshRecommendations();
            }}
            className="w-full rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-midnight/90"
          >
            ✅ Lecture terminée — propose-moi la suite
          </button>
        </div>
        <Card className="flex h-full flex-col gap-6">
          <div>
            <h3 className="text-xl font-semibold text-midnight">Notes guidées</h3>
            <p className="text-sm text-midnight/70">
              Laisse les idées s'ancrer — sélectionne une bulle pour t'inspirer.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {GUIDED_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => setActiveQuestion(question)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeQuestion === question
                    ? 'bg-midnight text-white shadow-lg'
                    : 'bg-white/70 text-midnight hover:bg-white'
                }`}
              >
                {question}
              </button>
            ))}
          </div>
          <div className="flex-1">
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={activeQuestion}
              className="h-48 w-full resize-none rounded-2xl border border-white/60 bg-white/80 p-5 text-base text-midnight shadow-inner transition focus:border-turquoise focus:bg-white"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              className="rounded-full border border-midnight/20 bg-white/80 px-5 py-2 text-sm font-semibold text-midnight transition hover:bg-white"
            >
              Sauvegarder pour plus tard
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-midnight px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-midnight/90"
            >
              ✨ Résumer avec IA
            </button>
          </div>
        </Card>
      </div>

      {sessionCompleted && (
        <Card tone="peach" className="space-y-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold text-midnight">Ta prochaine inspiration</h3>
            <p className="text-sm text-midnight/70">
              ChatGPT régénère une nouvelle constellation de livres pour continuer sur ta lancée.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {isRefreshing && <p className="text-sm text-midnight/60">Recherche des nouvelles pépites…</p>}
            {!isRefreshing &&
              nextOptions.map((book) => (
                <div key={book.id} className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-sm">
                  <span className="text-xs uppercase tracking-[0.2em] text-midnight/60">{book.theme}</span>
                  <h4 className="mt-2 text-lg font-semibold text-midnight">{book.title}</h4>
                  <p className="text-sm text-midnight/70">{book.author}</p>
                  <p className="mt-3 text-sm text-midnight/60">{book.description}</p>
                </div>
              ))}
            {!isRefreshing && !nextOptions.length && (
              <p className="text-sm text-midnight/60">
                L'IA est en train de se recentrer. Appuie sur le bouton ci-dessus pour relancer la magie ✨
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => void refreshRecommendations()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/80 px-6 py-3 text-sm font-semibold text-midnight transition hover:bg-white"
          >
            🔄 Rafraîchir encore
          </button>
        </Card>
      )}
    </section>
  );
}
