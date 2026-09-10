import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CompleteAccountForm } from './complete-account-form';

type Props = { params: Promise<{ sessionId: string }> };

export const metadata: Metadata = {
  title: 'Veyra — Completa tu cuenta',
  description: 'Vincula tu palma a tu cuenta Veyra',
  robots: { index: false, follow: false },
};

export default async function EnrollSessionPage({ params }: Props) {
  const { sessionId } = await params;
  return (
    <main
      className="min-h-[100dvh]"
      style={{
        background:
          'radial-gradient(900px 480px at 50% -8%, #1a2e28 0%, #141414 55%)',
      }}
    >
      <Suspense
        fallback={
          <div className="mx-auto flex min-h-[100dvh] max-w-md items-center px-6 text-[rgba(242,242,242,0.62)]">
            Cargando…
          </div>
        }
      >
        <CompleteAccountForm sessionId={sessionId} />
      </Suspense>
    </main>
  );
}
