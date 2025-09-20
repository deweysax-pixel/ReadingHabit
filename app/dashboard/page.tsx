import Link from 'next/link';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { getRandomEncouragement } from '@/lib/utils';

const sessionEncouragements = [
  '🔥 Tu as déjà 3 jours consécutifs !',
  '💫 Ta constance inspire ton équipe !',
  '🌱 Chaque session nourrit ton leadership.',
];

type DashboardPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const minutes = Number(searchParams.minutes ?? 20);
  const bookTitle = typeof searchParams.bookTitle === 'string' ? searchParams.bookTitle : null;
  const bookAuthor = typeof searchParams.bookAuthor === 'string' ? searchParams.bookAuthor : null;
  const bookTheme = typeof searchParams.bookTheme === 'string' ? searchParams.bookTheme : null;
  const themesParam = typeof searchParams.themes === 'string' ? searchParams.themes : '';
  const selectedThemes = themesParam ? themesParam.split(',').filter(Boolean) : ['Leadership', 'Coaching'];

  const mockUser = {
    name: 'Fred',
    dailyGoalMinutes: minutes || 20,
    streak: 3,
    totalMinutes: 145,
    themes: selectedThemes.map((theme, index) => ({
      name: theme,
      progress: [45, 30, 70, 55, 40, 35][index % 6],
    })),
  };

  const highlight = getRandomEncouragement();

  return (
    <section className="space-y-10">
      <Card tone="turquoise" className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-midnight/70">Dashboard</p>
          <h2 className="text-4xl font-semibold text-midnight">Hello {mockUser.name} 👋</h2>
          <p className="text-lg text-midnight/70">{highlight}</p>
          <p className="text-sm text-midnight/60">
            Objectif quotidien : {mockUser.dailyGoalMinutes} minutes — tu as déjà accumulé {mockUser.totalMinutes} minutes inspirantes.
          </p>
        </div>
        <Link
          href={{
            pathname: '/session',
            query: {
              bookTitle: bookTitle ?? mockUser.themes[0]?.name,
              bookAuthor: bookAuthor ?? 'Auteur surprise',
              bookTheme: bookTheme ?? mockUser.themes[0]?.name,
              themes: selectedThemes.join(','),
              minutes: mockUser.dailyGoalMinutes,
            },
          }}
          className="inline-flex items-center gap-2 rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-midnight/90"
        >
          Commencer ma session
        </Link>
      </Card>

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <Card className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-midnight/70">Streak</span>
            <p className="text-3xl font-semibold text-midnight">{mockUser.streak} jours consécutifs 🔥</p>
            <p className="text-sm text-midnight/60">{sessionEncouragements[0]}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-midnight/70">Temps total lu</span>
            <p className="text-2xl font-semibold text-midnight">{mockUser.totalMinutes} minutes</p>
          </div>
          <div className="grid gap-4">
            {mockUser.themes.map((theme) => (
              <div
                key={theme.name}
                className="rounded-2xl border border-white/50 bg-white/70 p-4 transition hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-midnight">{theme.name}</p>
                  <span className="text-sm text-midnight/70">{theme.progress}%</span>
                </div>
                <ProgressBar value={theme.progress} className="mt-3" />
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          {bookTitle && (
            <Card tone="lavender" className="space-y-3">
              <h3 className="text-xl font-semibold text-midnight">Lecture en cours</h3>
              <p className="text-lg font-semibold text-midnight">{bookTitle}</p>
              {bookAuthor && <p className="text-sm text-midnight/70">{bookAuthor}</p>}
              {bookTheme && (
                <span className="inline-flex w-fit rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-midnight/70">
                  {bookTheme}
                </span>
              )}
              <p className="text-sm text-midnight/60">
                Savoure chaque page — tu pourras rafraîchir la sélection avec l'IA dès que ta session sera terminée.
              </p>
            </Card>
          )}
          <Card tone="lavender" className="space-y-4">
            <h3 className="text-xl font-semibold text-midnight">Encouragement du jour</h3>
            <p className="text-lg text-midnight/70">{sessionEncouragements[1]}</p>
            <p className="text-sm text-midnight/60">
              Continue sur ta lancée — une nouvelle idée t'attend peut-être dans la prochaine page.
            </p>
          </Card>
          <Card tone="peach" className="space-y-4">
            <h3 className="text-xl font-semibold text-midnight">Prochain jalon</h3>
            <p className="text-lg text-midnight/70">Encore 3 sessions pour atteindre ton badge Visionnaire ✨</p>
            <p className="text-sm text-midnight/60">
              Profite d'une pause inspirante après chaque session et note ce qui t'allume l'esprit.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
