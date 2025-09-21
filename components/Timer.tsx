'use client';

import { useEffect, useMemo, useState } from 'react';
import { getRandomEncouragement } from '@/lib/utils';

interface TimerProps {
  initialMinutes: number;
  onComplete?: () => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${mins}:${secs}`;
};

export function Timer({ initialMinutes, onComplete }: TimerProps) {
  const normalizedMinutes = Number.isFinite(initialMinutes) && initialMinutes > 0 ? initialMinutes : 1;
  const initialSeconds = Math.round(normalizedMinutes * 60);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [encouragement, setEncouragement] = useState(getRandomEncouragement());

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      onComplete?.();
    }
  }, [isRunning, onComplete, secondsLeft]);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
    setIsRunning(false);
    setEncouragement(getRandomEncouragement());
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) return;
    const pulse = setInterval(() => setEncouragement(getRandomEncouragement()), 45_000);
    return () => clearInterval(pulse);
  }, [isRunning]);

  const progress = useMemo(() => {
    if (initialSeconds <= 0) {
      return 100;
    }

    return ((initialSeconds - secondsLeft) / initialSeconds) * 100;
  }, [initialSeconds, secondsLeft]);

  const resetTimer = () => {
    setSecondsLeft(initialSeconds);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6 rounded-3xl bg-white/60 p-8 text-center shadow-dreamy">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-sm uppercase tracking-[0.3em] text-midnight/60">Session en cours</span>
        <p className="text-6xl font-semibold text-midnight drop-shadow-sm">{formatTime(secondsLeft)}</p>
        <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-white/70">
          <div
            className="h-full rounded-full bg-gradient-to-r from-turquoise via-lavender to-peach transition-all duration-700"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
        <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-sm text-midnight/70">
          <span className="text-lg">✨</span>
          {encouragement}
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setIsRunning((prev) => !prev)}
          className="rounded-full bg-midnight px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-midnight/90"
        >
          {isRunning ? 'Pause' : 'Commencer'}
        </button>
        <button
          type="button"
          onClick={() => setIsRunning(false)}
          className="rounded-full bg-white/80 px-6 py-2 text-sm font-semibold text-midnight shadow transition hover:bg-white"
        >
          Stop
        </button>
        <button
          type="button"
          onClick={resetTimer}
          className="rounded-full border border-midnight/20 bg-white/70 px-6 py-2 text-sm font-semibold text-midnight transition hover:bg-white"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
