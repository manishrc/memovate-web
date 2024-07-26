'use client';

import PlayingCard from '@/components/PlayingCard';
import ReviewSet from '@/components/ReviewSet';
import { Button } from '@/components/ui/button';
import { useCurrentFlashcardSet, useUser } from '@/lib/hooks';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function Home() {
  const { isLoading } = useCurrentFlashcardSet();
  const user = useUser();

  if (!user) return null;

  return (
    <div className="flex flex-col h-dvh items-center">
      <h2 className="text-xl font-bold tracking-tight text-balance text-center mb-3 mt-12 px-6">
        Welcome back, {user?.name}
      </h2>
      <div className="grow md:grow-0 self-stretch flex flex-col items-center">
        <OrnamentalCardsPlacement />
        <h1 className="isolate md:-mt-32 text-5xl md:text-7xl max-w-lg font-bold tracking-tighter text-balance text-center px-6 ">
          Strengthen your memory in 10 min
        </h1>
      </div>
      <Dialog.Root>
        <div className="m-6 flex self-stretch items-center justify-center shrink-0">
          <Dialog.Trigger asChild>
            <Button className="w-full max-w-md" size="lg" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Start Review'}
            </Button>
          </Dialog.Trigger>
        </div>
        <Dialog.Portal>
          <Dialog.Content className="fixed inset-0 bg-zinc-100">
            <VisuallyHidden>
              <Dialog.DialogTitle>Review Flashcard Set</Dialog.DialogTitle>
            </VisuallyHidden>
            <ReviewSet />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function OrnamentalCardsPlacement() {
  return (
    <div className="w-full overflow-hidden py-12 ">
      <div className="flex justify-center mb-12 w-full max-w-md mx-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <PlayingCard
            key={index}
            className="shrink-0 -ml-[20%]"
            style={{
              transformOrigin: 'bottom center',
              transform: `rotate(${index - 4.5}deg) translateY(${Math.abs(
                index - 4.5
              )}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
