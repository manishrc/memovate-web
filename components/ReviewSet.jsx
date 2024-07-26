'use client';

import FlashCard from '@/components/FlashCard';
import Timer from '@/components/Timer';
import { Button } from '@/components/ui/button';
import fetchWithAuth from '@/lib/fetch-with-auth';
import { useCurrentFlashcardSet } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { useRef, useState } from 'react';
import { HiSparkles as MagicIcon } from 'react-icons/hi2';
import {
  MdCheck as CheckIcon,
  MdClose as CrossIcon,
  MdFlip as FlipIcon,
  MdTimer as TimerIcon,
} from 'react-icons/md';

const updateCardInSet = (cardSet, cardId) => {
  const cards = cardSet.cards.map((card) => {
    if (card.id === cardId) {
      return {
        ...card,
        has_review: true,
      };
    }
    return card;
  });

  return { ...cardSet, cards };
};

export default function ReviewSet() {
  const { data: cardSet, mutate } = useCurrentFlashcardSet();
  const [currentCardFlipped, setCurrentCardFlipped] = useState(false);

  // TODO: The timer's internal state is exposed through a workaround, rather than keeping the timer state within the component to prevents unnecessary re-rendering.
  const timerRef = useRef();
  const getTime = () => timerRef.current.getTime();

  if (!cardSet) return null;

  const cards = cardSet?.cards || [];
  const pendingCards = cards.filter((card) => !card.has_review);
  const finishCount = 10 - pendingCards.length;
  const hasFinished = pendingCards.length === 0;

  const currentCard = pendingCards[0];
  const currentCardFront = currentCard?.front_card_face_text;
  const currentCardBack = currentCard?.back_card_face_text;

  const updateResult = (result) => {
    const updatedCardSet = updateCardInSet(cardSet, currentCard.id);
    mutate(
      async (cardSet) => {
        try {
          await fetchWithAuth('https://api.memovate.com/api/card_reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              card_set_id: cardSet?.card_set_id,
              card_id: currentCard.id,
              result: result,
              response_time: getTime(),
            }),
          });
        } catch (error) {
          console.error('updateResult:', error);
        }
        return updatedCardSet;
      },
      {
        optimisticData: updatedCardSet,
        rollbackOnError: true,
        revalidate: false,
      }
    );
    setCurrentCardFlipped(false);
  };

  const handleAction = (action) => {
    switch (action) {
      case 'correct':
        updateResult(true);
        break;
      case 'incorrect':
        updateResult(false);
        break;
      case 'chat':
        console.log('Chat');
        break;
      default:
        console.log('Unknown action');
    }
  };

  const onFlip = () => {
    timerRef.current.pause();
    setCurrentCardFlipped(true);
  };

  const refreshFlascardSet = () => {
    mutate();
  };

  return (
    <>
      <div className="pt-3 px-4">
        {!hasFinished && (
          <SegmentProgress total={cards.length} current={finishCount + 1} />
        )}

        <div className="flex justify-between mt-1">
          <Dialog.Close className="w-11 h-11 inline-flex items-center justify-center -ml-2.5 opacity-30">
            <CrossIcon className="h-6 w-6" />
          </Dialog.Close>
          {!hasFinished && (
            <div className="flex items-center gap-1 opacity-50">
              <div className=" tabular-nums text-right font-semibold">
                <Timer ref={timerRef} key={currentCard.id} />
              </div>
              <TimerIcon className="h-6 w-6 relative -top-px" />
            </div>
          )}
        </div>
      </div>
      {hasFinished ? (
        <div className="pt-3 px-4 flex items-center justify-center flex-col gap-6">
          <h2 className="text-3xl">Well Done</h2>
          <Button size="lg" onClick={refreshFlascardSet}>
            Keep going
          </Button>
        </div>
      ) : (
        <>
          <div className="px-4 mt-1">
            <FlashCard
              front={currentCardFront}
              back={currentCardBack}
              onFlip={onFlip}
              flipped={currentCardFlipped}
              key={currentCard.id}
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
      )}
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
