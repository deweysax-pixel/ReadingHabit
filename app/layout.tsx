import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });

export const metadata: Metadata = {
  title: 'Reading Habit Companion',
  description:
    'Construis une routine de lecture motivante autour du leadership, du coaching, du self-awareness et de la communication.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body className="min-h-screen bg-cream text-midnight">
        <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 md:px-10 lg:px-16">
          <div className="absolute inset-0 -z-10 bg-soft-gradient opacity-40 blur-3xl" aria-hidden />
          <header className="mb-10 flex flex-col gap-3 text-center md:text-left">
            <span className="text-sm uppercase tracking-[0.35em] text-midnight/70">Reading Habit</span>
            <h1 className="text-3xl font-semibold text-midnight md:text-4xl">
              Ton espace pour lire, réfléchir et progresser jour après jour ✨
            </h1>
          </header>
          <div className="flex-1">{children}</div>
          <footer className="mt-16 text-center text-sm text-midnight/60">
            Prototype interactif — prêt à accueillir une future intégration IA.
          </footer>
        </main>
      </body>
    </html>
  );
}
