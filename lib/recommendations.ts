export type BookRecommendation = {
  id: string;
  title: string;
  author: string;
  theme: string;
  description: string;
};

const BASE_RECOMMENDATIONS: BookRecommendation[] = [
  {
    id: 'leadership-dare-to-lead',
    title: 'Dare to Lead',
    author: 'Brené Brown',
    theme: 'Leadership',
    description:
      "Un guide puissant pour mener avec courage et vulnérabilité, parfait pour inspirer une équipe en quête d'authenticité.",
  },
  {
    id: 'leadership-extreme-ownership',
    title: 'Extreme Ownership',
    author: 'Jocko Willink & Leif Babin',
    theme: 'Leadership',
    description:
      "Des principes concrets pour assumer ses décisions et insuffler une culture de responsabilité à 360°.",
  },
  {
    id: 'coaching-the-coaching-habit',
    title: 'The Coaching Habit',
    author: 'Michael Bungay Stanier',
    theme: 'Coaching',
    description:
      'Sept questions incisives pour créer des conversations de coaching courtes, profondes et transformatrices.',
  },
  {
    id: 'coaching-coactive-coaching',
    title: 'Co-Active Coaching',
    author: 'Henry Kimsey-House et al.',
    theme: 'Coaching',
    description:
      'Un classique pour développer une posture de coach généreuse, orientée vers la responsabilisation durable.',
  },
  {
    id: 'self-awareness-atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    theme: 'Self-Awareness',
    description:
      'Des micro-changements pour façonner ton identité quotidienne et renforcer une conscience attentive.',
  },
  {
    id: 'self-awareness-insight',
    title: 'Insight',
    author: 'Tasha Eurich',
    theme: 'Self-Awareness',
    description:
      'Une exploration méthodique de la connaissance de soi pour prendre des décisions alignées et lumineuses.',
  },
  {
    id: 'communication-crucial-conversations',
    title: 'Crucial Conversations',
    author: 'Kerry Patterson et al.',
    theme: 'Communication',
    description:
      'Des outils puissants pour naviguer les conversations sensibles avec élégance et impact.',
  },
  {
    id: 'communication-nonviolent-communication',
    title: 'Nonviolent Communication',
    author: 'Marshall Rosenberg',
    theme: 'Communication',
    description:
      'Une méthode empathique pour connecter, écouter et se faire entendre sans heurter.',
  },
  {
    id: 'creativite-steal-like-an-artist',
    title: 'Steal Like an Artist',
    author: 'Austin Kleon',
    theme: 'Créativité',
    description:
      "Un manifeste ludique pour booster ta créativité et relier les idées de façon inattendue.",
  },
  {
    id: 'creativite-creative-confidence',
    title: 'Creative Confidence',
    author: 'Tom & David Kelley',
    theme: 'Créativité',
    description:
      'Des techniques pour libérer ton potentiel créatif et oser prototyper des solutions vibrantes.',
  },
  {
    id: 'strategie-good-strategy-bad-strategy',
    title: 'Good Strategy Bad Strategy',
    author: 'Richard Rumelt',
    theme: 'Stratégie',
    description:
      'Un regard lucide sur ce qui rend une stratégie tranchante et sur la façon de la déployer avec clarté.',
  },
  {
    id: 'strategie-playing-to-win',
    title: 'Playing to Win',
    author: 'A.G. Lafley & Roger Martin',
    theme: 'Stratégie',
    description:
      "Une approche structurée pour choisir ses batailles et construire un avantage durable avec élégance.",
  },
];

export function getFallbackRecommendations(themes: string[], query?: string): BookRecommendation[] {
  const normalizedQuery = query?.toLowerCase();

  const shortlist = themes.length
    ? BASE_RECOMMENDATIONS.filter((book) => themes.includes(book.theme))
    : BASE_RECOMMENDATIONS;

  const ranked = normalizedQuery
    ? [...shortlist].sort((a, b) => {
        const score = (book: BookRecommendation) => {
          const haystack = `${book.title} ${book.author} ${book.theme} ${book.description}`.toLowerCase();
          return haystack.includes(normalizedQuery) ? 1 : 0;
        };
        return score(b) - score(a);
      })
    : shortlist;

  const topFive = ranked.slice(0, 5);

  if (topFive.length === 5) {
    return topFive;
  }

  const remaining = BASE_RECOMMENDATIONS.filter((book) => !topFive.includes(book));

  return [...topFive, ...remaining].slice(0, 5);
}

