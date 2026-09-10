import { redirect } from 'next/navigation';

/** Optional entry: /enroll?session=enr_… → /e/enr_… */
export default async function EnrollRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const q = await searchParams;
  const session = q.session?.trim();
  if (session) {
    redirect(`/e/${encodeURIComponent(session)}`);
  }
  redirect('/');
}
