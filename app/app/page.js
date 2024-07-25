'use client';

import FlashCard from '@/components/FlashCard';
import { Button } from '@/components/ui/button';
import { useCardSet } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { HiSparkles as MagicIcon } from 'react-icons/hi2';
import {
  MdCheck as CheckIcon,
  MdClose as CrossIcon,
  MdFlip as FlipIcon,
  MdTimer as TimerIcon,
} from 'react-icons/md';
import Timer from '@/components/Timer';
import PlayingCard from '@/components/PlayingCard';

export default function Home() {
  const { isLoading } = useCardSet();

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-5xl font-bold tracking-tight text-balance text-center mb-12 mt-24">
        Strengthen your memory in 10 min
      </h1>
      <div className="flex -space-x-[30%] justify-center mb-24">
        {Array.from({ length: 10 }).map((_, index) => (
          <PlayingCard
            key={index}
            style={{
              transform: `rotate(${(index + 1) * 2 - 10}deg) translateY(${
                Math.abs(index + 1 - 5) * 2
              }px)`,
            }}
          />
        ))}
      </div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button size="lg" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Start Review'}
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content className="fixed inset-0 bg-zinc-100">
            <ReviewSet />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

const updateCard = (data, cardId) => {
  const cards = data.cards.map((card) => {
    if (card.id === cardId) {
      return {
        ...card,
        has_review: true,
      };
    }
    return card;
  });

  return { ...data, cards };
};

function ReviewSet() {
  const { data, isLoading, isValidating, mutate, updateCardReview } =
    useCardSet();
  const timerRef = useRef(0);
  const [currentCardFlipped, setCurrentCardFlipped] = useState(false);

  const cards = data?.cards || [];
  const currentCard = cards.filter((card) => card.has_review === false)[0];
  const currentCardIndex = cards.indexOf(currentCard);
  const currentCardFront = currentCard?.front_card_face_text;
  const currentCardBack = currentCard?.back_card_face_text;

  const handleAction = (action) => {
    switch (action) {
      case 'correct':
        mutate(updateCard(data, currentCard?.id));
        setCurrentCardFlipped(false);
        updateCardReview({
          cardId: currentCard?.id,
          result: true,
          responseTime: timerRef.current.getTime(),
        });
        break;
      case 'incorrect':
        mutate(updateCard(data, currentCard?.id));
        setCurrentCardFlipped(false);
        updateCardReview({
          cardId: currentCard?.id,
          result: false,
          responseTime: timerRef.current.getTime(),
        });
        break;
      case 'chat':
        console.log('Chat');
        break;
      default:
        console.log('Unknown action');
    }
  };

  const onFlip = () => {
    setCurrentCardFlipped((prev) => {
      timerRef.current.pause();
      return !prev;
    });
  };

  return (
    <>
      <div className="pt-3 px-4">
        <SegmentProgress total={cards.length} current={currentCardIndex + 1} />

        <div className="flex justify-between mt-1">
          <Dialog.Close className="w-11 h-11 inline-flex items-center justify-center -ml-2.5 opacity-30">
            <CrossIcon className="h-6 w-6" />
          </Dialog.Close>
          <Timer ref={timerRef} key={currentCard?.id} />
        </div>
      </div>
      <div>{/* Timer */}</div>
      <div className="px-4 mt-1">
        <FlashCard
          front={currentCardFront}
          back={currentCardBack}
          onFlip={onFlip}
          flipped={currentCardFlipped}
          key={currentCard?.id}
        />
      </div>
      <div className="mt-3">
        <ActionBar
          onFlip={onFlip}
          flipped={currentCardFlipped}
          onAction={handleAction}
        />
      </div>
    </>
  );
}

function SegmentProgress({ current = 1, total = 10 }) {
  return (
    <div className="flex w-full gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-1 bg-black rounded-sm opacity-10 flex-1',
            index + 1 === current && 'bg-black opacity-30',
            index + 1 < current && 'bg-black opacity-100'
          )}
        />
      ))}
    </div>
  );
}

function ActionBar({ flipped = false, onFlip, onAction }) {
  return (
    <div className="flex items-center gap-3 justify-center">
      {flipped ? (
        <>
          <button
            className="active:shadow-sm transition-all select-none active:bg-zinc-50 p-3 bg-white rounded-full shadow-md"
            type="button"
            onClick={() => onAction('correct')}
          >
            <CheckIcon className="fill-green-600 w-6 h-6" />
          </button>
          <button
            className="hidden active:shadow-sm transition-all select-none active:bg-zinc-50 p-2.5 bg-white rounded-full shadow-md"
            type="button"
            onClick={() => onAction('chat')}
          >
            <MagicIcon className="fill-sky-500 w-5 h-5" />
          </button>
          <button
            className="active:shadow-sm transition-all select-none active:bg-zinc-50 p-3 bg-white rounded-full shadow-md"
            type="button"
            onClick={() => onAction('incorrect')}
          >
            <CrossIcon className="fill-red-600 w-6 h-6" />
          </button>
        </>
      ) : (
        <button
          className="active:shadow-sm transition-all select-none active:bg-zinc-50 p-3 bg-white rounded-full shadow-md"
          type="button"
          onClick={onFlip}
        >
          <FlipIcon className="fill-zinc-600 w-6 h-6" />
        </button>
      )}
    </div>
  );
}
