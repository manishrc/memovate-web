import { Footer } from '@/app/(marketing)/components/Footer';
import { Header } from '@/app/(marketing)/components/Header';

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  );
}
