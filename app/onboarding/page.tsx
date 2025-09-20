'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { getRandomEncouragement } from '@/lib/utils';

const THEMES = ['Leadership', 'Coaching', 'Self-Awareness', 'Communication', 'Créativité', 'Stratégie'];

export default function OnboardingPage() {
  const [selectedThemes, setSelectedThemes] = useState<string[]>(['Leadership', 'Self-Awareness']);
  const [minutes, setMinutes] = useState(20);
  const encouragement = useMemo(() => getRandomEncouragement(), []);

  const toggleTheme = (theme: string) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((item) => item !== theme) : [...prev, theme]
    );
  };

  return (
    <section className="space-y-10">
      <Card tone="lavender" className="space-y-5">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight/70">Onboarding</p>
        <h2 className="text-4xl font-semibold text-midnight">Bienvenue dans ta nouvelle aventure de lecture !</h2>
        <p className="text-lg text-midnight/70">
          Configure une routine sur mesure pour nourrir ta curiosité. {encouragement}
        </p>
      </Card>

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <Card className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-midnight">Choisis tes thématiques vibrantes</h3>
            <p className="text-sm text-midnight/70">
              Combine leadership, coaching et introspection pour un mix qui te ressemble.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {THEMES.map((theme) => {
              const isSelected = selectedThemes.includes(theme);
              return (
                <label key={theme} className="group">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={isSelected}
                    onChange={() => toggleTheme(theme)}
                  />
                  <div
                    className={`rounded-3xl border border-white/60 bg-white/70 p-5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl peer-checked:bg-turquoise/40 peer-checked:shadow-dreamy`}
                  >
                    <span className="text-lg font-semibold text-midnight">{theme}</span>
                    <p className="mt-2 text-sm text-midnight/70">
                      {isSelected ? 'Ajouté à ta playlist mentale ✨' : 'Clique pour explorer cette énergie.'}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </Card>

        <Card tone="peach" className="flex h-full flex-col justify-between space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-midnight">Temps quotidien</h3>
            <p className="text-sm text-midnight/70">
              Indique le temps doux que tu veux offrir à tes lectures.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={5}
              max={90}
              value={minutes}
              onChange={(event) => setMinutes(Number(event.target.value))}
              className="flex-1 accent-turquoise"
            />
            <span className="text-3xl font-semibold text-midnight">{minutes}</span>
            <span className="text-sm text-midnight/60">min</span>
          </div>
          <p className="text-sm text-midnight/70">
            Nous t'enverrons des rappels inspirants pour maintenir ta cadence.
          </p>
        </Card>
      </div>

      <Card className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h3 className="text-xl font-semibold text-midnight">Tout est prêt !</h3>
          <p className="text-sm text-midnight/70">
            {selectedThemes.length} thématique(s) sélectionnées — {minutes} minutes par jour. Tu es prêt·e à créer un rituel
            vibrant.
          </p>
        </div>
        <Link
          href={{ pathname: '/dashboard', query: { minutes } }}
          className="inline-flex items-center gap-2 rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white transition hover:bg-midnight/90"
        >
          Construis ma routine ✨
        </Link>
      </Card>
    </section>
  );
}
