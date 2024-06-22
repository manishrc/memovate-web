import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect('/login');
  // home page
  return (
    <>
      <h1 className="text-6xl font-bold">Welcome, {user?.name}!</h1>
      <div className="max-w-2xl bg-zinc-100 mx-auto mb-64 p-6 rounded ">
        {JSON.stringify(session, null, 2)}
      </div>
    </>
  );
}
