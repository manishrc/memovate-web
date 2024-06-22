import * as React from 'react';
import {
  Tailwind,
  Button,
  Html,
  Text,
  Container,
  Section,
  Link,
  Hr,
} from '@react-email/components';

export default function LoginMagicLink(props) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || props.appName;
  const appHome = process.env.NEXTAUTH_URL || props.appHome;
  const loginLink = props.loginLink;
  return (
    <Html>
      <Tailwind>
        <Section className="font-sans p-3">
          <Container>
            <Section className="border border-solid border-zinc-100  p-8 ">
              <Text className="text-black text-xl font-semibold mt-0 mb-4">
                Your login link for {appName}
              </Text>
              <Button
                className=" text-white rounded bg-black py-3 px-5 my-2"
                href={loginLink}
              >
                Login to {appName}
              </Button>

              <Text className="text-zinc-500">
                This link will only be valid for the next 24 hours. If you
                didn&apos;t request this, you can ignore this email.
              </Text>
              <Text className="text-zinc-500"></Text>
            </Section>
          </Container>
          <Hr className="border-zinc-100 mt-8 mb-2" />
          <Section>
            <Link className="text-zinc-400 text-xs" href={appHome}>
              {appName}
            </Link>
          </Section>
        </Section>
      </Tailwind>
    </Html>
  );
}

LoginMagicLink.PreviewProps = {
  loginLink: 'https://example.com/auth-link',
  appName: 'App Name',
  appHome: process.env.NEXTAUTH_URL || 'http://localhost:3000/',
};
