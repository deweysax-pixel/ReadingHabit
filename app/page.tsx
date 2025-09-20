import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-3xl bg-white/70 p-10 text-center shadow-dreamy">
      <p className="text-lg text-midnight/70">Prototype rapide — découvre l'expérience immersive.</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/onboarding"
          className="rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white transition hover:bg-midnight/90"
        >
          Démarrer l'onboarding ✨
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full border border-midnight/20 bg-white px-6 py-3 text-sm font-semibold text-midnight transition hover:bg-white/90"
        >
          Voir le dashboard de Fred
        </Link>
      </div>
    </div>
  );
}
