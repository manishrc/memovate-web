import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    template: `%s - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    default: `${process.env.NEXT_PUBLIC_APP_NAME} - ${process.env.NEXT_PUBLIC_TAGLINE}`,
  },
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider themes="system">{children}</ThemeProvider>
      </body>
    </html>
  );
}
