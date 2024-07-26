import { getSession } from 'next-auth/react';

let sessionPromise;

export default async function fetchWithAuth(url, options) {
  if (!sessionPromise) {
    sessionPromise = getSession();
  }

  const session = await sessionPromise;
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
}
