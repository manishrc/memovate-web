'use server';

import 'server-only';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import z from 'zod';
import db, { schema } from '@/db';
import { eq } from 'drizzle-orm';
// TODO: Redirect to next page after login
// TODO: add captcha
// TODO: add rate limits

const UserSchema = z.object({
  email: z
    .string()
    .email()
    .transform((v) => v.trim().toLowerCase()),
  next: z.string().optional().default('/'),
});

export async function signInAction(_prevState, formData) {
  const ip = headers().get('x-real-ip') ?? 'local';

  const input = UserSchema.safeParse({
    email: formData.get('email'),
    next: formData.get('next') || undefined,
  });

  console.log('Sign in action', input.error?.format());

  // Fail Fast
  if (!input.success) {
    return {
      error: {
        code: 'AUTH_ERROR',
        message: 'Failed to login. Check your credentials',
      },
    };
  }

  try {
    // Get user from db
    const manybeUser = await db.query.users.findFirst({
      where: eq(schema.users.email, input.data.email),
    });

    // fail if user not already in db for login.
    // TODO: check for authenticated / verified
    if (!manybeUser) {
      console.log('Account does not exist: ', input.data.email);
      return {
        error: {
          code: 'AUTH_ERROR',
          message: 'Account does not exist. Please create an account.',
        },
      };
    }

    await signIn('resend', {
      email: input.data.email,
      redirect: false,
    });

    return {
      data: {
        code: 'SUCCESS',
        message: 'Check your email for a login link',
      },
    };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      return {
        error: {
          code: 'AUTH_ERROR',
          message: 'Failed to login. Check your credentials',
        },
      };
    } else {
      return {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Server error. Please try again later',
        },
      };
    }
  }

  redirect(input.data.next);
}
