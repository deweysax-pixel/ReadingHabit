export function cn(...inputs: Array<string | undefined | false | null>) {
  return inputs.filter(Boolean).join(' ');
}

export const encouragements = [
  'Tu avances, bravo !',
  'Chaque page compte 💡',
  'Ton futur toi te remercie',
  'Continue, ta curiosité est ton super-pouvoir ✨',
  'Respire, savoure et laisse les idées infuser 🌿',
];

export function getRandomEncouragement(): string {
  return encouragements[Math.floor(Math.random() * encouragements.length)];
}
