import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: {
    template: `%s - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    default: `${process.env.NEXT_PUBLIC_APP_NAME} - ${process.env.NEXT_PUBLIC_TAGLINE}`,
  },
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
};

export const viewport = {
  // minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover
  themeColor: '#F4F4F5',
  minimumScale: '1',
  initialScale: '1',
  width: 'device-width',
  shrinkToFit: 'no',
  userScalable: 'no',
  viewportFit: 'cover',
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <ThemeProvider themes="system">
      <SessionProvider session={session}>{children}</SessionProvider>
      <Toaster />
    </ThemeProvider>
  );
}

function Guides() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="absolute h-screen w-full">
      <div className="absolute h-screen bg-red-500 w-px left-4" />
      <div className="absolute h-screen bg-blue-500 w-px left-7" />
      <div className="absolute h-screen bg-red-500 w-px right-4" />
      <div className="absolute h-screen bg-blue-500 w-px right-7" />
      <div className="absolute h-screen grid grid-cols-7 gap-1 px-4">
        <div className="w-12 h-screen bg-green-600 bg-opacity-10" />
        <div className="w-12 h-screen bg-green-600 bg-opacity-10" />
        <div className="w-12 h-screen bg-green-600 bg-opacity-10" />
        <div className="w-12 h-screen bg-green-600 bg-opacity-10" />
        <div className="w-12 h-screen bg-green-600 bg-opacity-10" />
        <div className="w-12 h-screen bg-green-600 bg-opacity-10" />
        <div className="w-12 h-screen bg-green-600 bg-opacity-10" />
      </div>
    </div>
  );
}
