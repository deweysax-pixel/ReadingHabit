'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/Card';
import { Timer } from '@/components/Timer';
import { getRandomEncouragement } from '@/lib/utils';

const GUIDED_QUESTIONS = [
  'Qu’est-ce qui t’a marqué ?',
  'Quelle action vas-tu tenter demain ?',
  'Quel passage as-tu envie de partager ?',
];

export default function SessionPage() {
  const [notes, setNotes] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(GUIDED_QUESTIONS[0]);
  const encouragement = useMemo(() => getRandomEncouragement(), []);

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
        <Timer initialMinutes={20} />
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
    </section>
  );
}
