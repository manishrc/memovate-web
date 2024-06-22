"use server";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return (
    <>
      <h1>Server Component</h1>
      {session ? (
        <p>You can view this page because you are signed in.</p>
      ) : (
        <p>You must be signed in to view this page.</p>
      )}
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </>
  );
}
