/*
- Dropbox OAuth Guide: https://developers.dropbox.com/oauth-guide
- Authjs Provider Signature: https://authjs.dev/reference/core/providers#oauth2configprofile
- Authjs Provider GitHub example: https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/github.ts
*/

// https://authjs.dev/guides/upgrade-to-v5#authenticating-server-side

import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import Resend from 'next-auth/providers/resend';
import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import DropboxProvider from 'next-auth/providers/dropbox';
import { resend, LoginMagicLink } from '@/emails';
// https://authjs.dev/reference/adapter/drizzle
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import db from '@/db';
import { accounts } from '@/db/schema';

const authOptions = {
  session: {
    strategy: 'database',
  },
  adapter: DrizzleAdapter(db),
  providers: [
    {
      id: 'dropbox',
      name: 'Dropbox',
      type: 'oidc',
      clientId: process.env.AUTH_DROPBOX_ID,
      clientSecret: process.env.AUTH_DROPBOX_SECRET,
      allowDangerousEmailAccountLinking: true,
      issuer: 'https://www.dropbox.com',
      wellKnown: 'https://www.dropbox.com/.well-known/openid-configuration',
      authorization: {
        url: 'https://www.dropbox.com/oauth2/authorize',
        params: {
          scope: 'openid profile email account_info.read files.content.read',
          token_access_type: 'offline',
          response_type: 'code', // OICD
        },
      },
      // Dropbox always provides a verified email: https://developers.dropbox.com/oidc-guide
      token: {
        url: 'https://api.dropboxapi.com/oauth2/token',
      },
      profile(profile) {
        return {
          ...profile,
          name: `${profile.given_name} ${profile.family_name}`,
        };
      },
    },

    Resend({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        token,
        baseUrl,
        provider,
      }) {
        const { data, error } = await resend.emails.send({
          from: 'hello@resend.manishrc.com',
          to: 'hi@manishrc.com',
          subject: `Your login link for ${process.env.NEXT_PUBLIC_APP_NAME}`,
          //   html: render(<ExampleEmail ctaLink="https://manishrc.com" />),
          react: (
            <LoginMagicLink
              loginLink={url}
              appName={process.env.NEXT_PUBLIC_APP_NAME}
              appHome={process.env.NEXTAUTH_URL}
            />
          ),
        });
      },
    }),

    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
