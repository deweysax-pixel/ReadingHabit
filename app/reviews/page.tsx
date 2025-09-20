'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Flashcard } from '@/components/Flashcard';

const reviewBuckets = [
  { label: 'J+2', description: 'Consolide les insights récents pour les ancrer.' },
  { label: 'J+7', description: 'Relis pour transformer l’idée en habitude.' },
  { label: 'J+30', description: 'Reconnecte-toi aux pépites qui comptent vraiment.' },
];

const flashcards = [
  {
    insight: 'Pratiquer une écoute active en réunion crée un climat de confiance.',
    action: 'Demander au moins une question ouverte à chaque collaborateur demain.',
    tag: 'Communication',
  },
  {
    insight: 'Un leader vulnérable renforce la cohésion.',
    action: 'Partager un apprentissage personnel dans le prochain point équipe.',
    tag: 'Leadership',
  },
  {
    insight: 'Les feedbacks réguliers boostent la progression.',
    action: 'Planifier un créneau hebdo de coaching éclair avec mon binôme.',
    tag: 'Coaching',
  },
];

export default function ReviewsPage() {
  const [selectedBucket, setSelectedBucket] = useState(reviewBuckets[0].label);

  return (
    <section className="space-y-10">
      <Card tone="peach" className="space-y-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm uppercase tracking-[0.3em] text-midnight/70">Révisions</span>
          <h2 className="text-4xl font-semibold text-midnight">Réactive ce que tu as appris 🔁</h2>
          <p className="text-lg text-midnight/70">
            Les rappels espacés entretiennent la magie des livres. Choisis ton focus du jour.
          </p>
        </div>
      </Card>

      <Card className="space-y-6">
        <div className="flex flex-wrap gap-3">
          {reviewBuckets.map((bucket) => (
            <button
              key={bucket.label}
              type="button"
              onClick={() => setSelectedBucket(bucket.label)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedBucket === bucket.label
                  ? 'bg-midnight text-white shadow-lg'
                  : 'bg-white/80 text-midnight hover:bg-white'
              }`}
            >
              {bucket.label} — {bucket.description}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flashcards.map((flashcard) => (
            <Flashcard key={flashcard.insight} {...flashcard} />
          ))}
        </div>
      </Card>
    </section>
  );
}
