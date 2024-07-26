'use server';
import { signIn } from '@/auth';

export const loginAction = async (formData) => {
  const { username, password } = Object.fromEntries(formData);

  return await signIn('credentials', {
    username,
    password,
    redirectTo: process.env.NEXT_PUBLIC_AUTH_DEFAULT_LOGGED_IN_URL,
  });
};
