import { getSession } from 'next-auth/react';

let session;

export default async function fetchWithAuth(url, options) {
  if (!session) {
    session = await getSession().catch((error) => {
      console.error('fetchWithAuth.getSession:', error);
    });
  }

  return fetch(url, {
    ...(options || {}),
    headers: {
      ...(options?.headers ?? {}),
      Authorization: `Bearer ${session.accessToken}`,
    },
  }).catch((error) => {
    console.error('fetchWithAuth.fetch:', error);
  });
}
