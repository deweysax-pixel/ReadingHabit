import { Suspense } from 'react';
import { SessionPageClient } from './SessionPageClient';

type SessionPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function SessionPage({ searchParams }: SessionPageProps) {
  return (
    <Suspense fallback={<div className="text-midnight">Chargement de ta session…</div>}>
      <SessionPageClient searchParams={searchParams} />
    </Suspense>
  );
}
