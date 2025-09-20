'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FlashcardProps {
  insight: string;
  action: string;
  tag: string;
}

export function Flashcard({ insight, action, tag }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((prev) => !prev)}
      className={cn('flip-card w-full max-w-sm rounded-3xl bg-transparent text-left focus:outline-none')}
    >
      <div className={cn('flip-card-inner rounded-3xl shadow-dreamy', flipped && 'flipped')}>
        <div className="flip-card-face front rounded-3xl bg-white/80 p-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-lavender/40 px-3 py-1 text-xs font-semibold text-midnight/70">
            📌 {tag}
          </span>
          <p className="mt-4 text-lg font-semibold text-midnight">{insight}</p>
          <p className="mt-2 text-sm text-midnight/70">Tapote pour découvrir l'action que tu avais imaginée.</p>
        </div>
        <div className="flip-card-face back rounded-3xl bg-turquoise/30 p-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-midnight/70">
            🎯 Action
          </span>
          <p className="mt-4 text-lg font-semibold text-midnight">{action}</p>
          <p className="mt-2 text-sm text-midnight/70">Retourne la carte pour revoir ton insight.</p>
        </div>
      </div>
    </button>
  );
}
