import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type CardTone = 'default' | 'lavender' | 'turquoise' | 'peach';

const toneClasses: Record<CardTone, string> = {
  default: 'bg-white/80 text-midnight',
  lavender: 'bg-lavender/40 text-midnight',
  turquoise: 'bg-turquoise/40 text-midnight',
  peach: 'bg-peach/40 text-midnight',
};

export interface CardProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  tone?: CardTone;
  interactive?: boolean;
}

export function Card({
  children,
  className,
  tone = 'default',
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-white/50 p-6 shadow-dreamy backdrop-blur-sm transition duration-500',
        'hover:-translate-y-1 hover:shadow-xl',
        interactive && 'cursor-pointer hover:scale-[1.02] active:scale-[0.99]',
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
