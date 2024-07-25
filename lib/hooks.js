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

export const useCardSet = () => {
  const accessToken = useAccessToken();
  const { data, ...rest } = useSWR(accessToken ? 'next-reivew' : null, () =>
    fetch('https://api.memovate.com/api/card_sets/next', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json())
  );

  const updateCardReview = async ({ cardId, result, responseTime }) => {
    // {
    //   "card_set_id": "243dbf4d-ed7a-4ab3-aad7-06b0c87c9aae",
    //   "card_id": "696eeb2b-0724-41ee-865b-7a0b7e0a1558",
    //   "result": true,
    //   "response_time": 2000
    // }

    return fetch('https://api.memovate.com/api/card_reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        card_set_id: data?.card_set_id,
        card_id: cardId,
        result: result,
        response_time: responseTime,
      }),
    });
  };

  return { data, updateCardReview, ...rest };
};
