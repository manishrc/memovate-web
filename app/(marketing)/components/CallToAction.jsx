import { AppStoreLink } from '@/app/(marketing)/components/AppStoreLink';
import { CircleBackground } from '@/app/(marketing)/components/CircleBackground';
import { Container } from '@/app/(marketing)/components/Container';

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Start enhancing your memory today.
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Sign up in 30 seconds and start learning more efficiently and
            enjoyably.
          </p>

          <div className="mt-8 flex justify-center">
            <AppStoreLink color="white" />
          </div>
        </div>
      </Container>
    </section>
  );
}
