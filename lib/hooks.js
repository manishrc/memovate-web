import { useSession } from 'next-auth/react';
import useSWR from 'swr';

export const useUser = () => {
  const { data: session } = useSession();
  return session?.user;
};

export const useAccessToken = () => {
  const { data: session } = useSession();
  return session?.accessToken;
};

export const useCurrentFlashcardSet = () => {
  const accessToken = useAccessToken();
  return useSWR(
    accessToken ? '/api/card_sets/next' : null,
    () => {
      return fetch('https://api.memovate.com/api/card_sets/next', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.json());
    },
    {
      revalidateOnFocus: false,
    }
  );
};
