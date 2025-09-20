'use client';

import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // between 0 and 100
  label?: string;
}

export function ProgressBar({ value, label, className, ...props }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {label && <span className="text-sm font-medium text-midnight/80">{label}</span>}
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/60">
        <div
          className="h-full rounded-full bg-gradient-to-r from-lavender via-turquoise to-peach transition-[width] duration-700 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="block text-xs text-midnight/60">{clamped.toFixed(0)}%</span>
    </div>
  );
}
