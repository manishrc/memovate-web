import NextAuth, { CredentialsSignin } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const EXPIRE_BUFFER = 60 * 1000; // 1 minute

const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize({ username, password }, request) {
        // Get Auth Token
        try {
          const authResponse = await fetch(
            'https://api.memovate.com/oauth/token',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                grant_type: 'password',
                email: username,
                password: password,
              }),
            }
          );

          // TODO: Throw error if response is not ok
          if (!authResponse.ok)
            throw new CredentialsSignin(
              await authResponse
                .json()
                .then(({ error_description }) => error_description)
            );

          const { accessToken, refreshToken, expiresIn, createdAt } =
            await authResponse.json().then(transformResponse);

          // Get user info
          const userResponse = await fetch(
            'https://api.memovate.com/api/users/info',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const {
            id,
            user: name,
            email,
            // `image` doesn't exist
          } = await userResponse.json();

          const user =
            {
              id,
              name,
              email,
              // image: undefined, //  Add Image ,
              accessToken,
              refreshToken,
              createdAt,
              expiresIn, // Seconds
              expiresAt: (createdAt + expiresIn) * 1000,
            } ?? null;

          return user;
        } catch (error) {
          console.error('authorize:', error);
        }
      },
    }),
  ],
  callbacks: {
    // https://authjs.dev/reference/core#jwt
    async jwt({ token, user, account, isNewUser, trigger }) {
      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
          iat: user.createdAt,
          exp: user.createdAt + user.expiresIn,
        };
      }

      // if token is expired, refresh token
      if (!token?.expiresAt || token?.expiresAt - EXPIRE_BUFFER < Date.now()) {
        const { accessToken, expiresIn, refreshToken, createdAt } =
          await rotateToken(token?.refreshToken).then(transformResponse);

        token = {
          ...token,
          accessToken,
          refreshToken,
          expiresIn,
          expiresAt: (createdAt + expiresIn) * 1000,
          iat: createdAt,
          exp: createdAt + expiresIn,
        };
      }

      return token;
    },

    // https://authjs.dev/reference/core#session
    async session({ session, token }) {
      return {
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
        },
        expiresAt: token.expiresAt,
        accessToken: token.accessToken,
      };
    },
  },
  pages: {
    signIn: '/login',
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

async function rotateToken(refreshToken) {
  try {
    const response = await fetch('https://api.memovate.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    return response.json();
  } catch (error) {
    console.error('rotateToken:', error);
  }
}

async function transformResponse(responseJson) {
  return {
    accessToken: responseJson.access_token,
    refreshToken: responseJson.refresh_token,
    expiresIn: responseJson.expires_in, // Seconds
    createdAt: responseJson.created_at, // UNIX Timestamp
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
