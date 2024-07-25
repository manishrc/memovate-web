'use client';
import { cn } from '@/lib/utils';
import {
  MdFlip as FlipIcon,
  MdOutlineSwipe as SwipeIcon,
} from 'react-icons/md';

export default function FlashCard({
  front = '',
  back = '',
  flipped = false,
  onFlip,
}) {
  const frontLength = front.length;
  const backLength = back.length;

  return (
    <button
      className="block relative rounded-2xl drop-shadow bg-white p-8 w-full aspect-[1/1.4] max-h-[calc(100dvh-176px)] max-w-lg mx-auto"
      type="button"
      disabled={flipped}
      onClick={onFlip}
    >
      <div className="flex flex-col ">
        <div
          className={cn(
            'mb-6 text-xl font-bold transition-all opacity-100 text-balance',
            frontLength < 54
              ? 'text-2xl leading-tight tracking-tight'
              : 'text-lg',
            flipped && 'opacity-50 text-base font-semibold'
          )}
        >
          {front}
        </div>

        <div
          className={cn(
            'font-bold text-2xl leading-tight tracking-tight transition-all opacity-100',
            flipped ? 'visible' : 'invisible'
          )}
        >
          {back}
        </div>
      </div>
      <div className="absolute z-10 bottom-1 left-0 right-0 text-center">
        <div className="items-center inline-flex gap-2 bg-white px-3 py-1.5 rounded-sm select-none pointer-events-none">
          {flipped ? (
            <>
              <SwipeIcon className="w-5 h-5 opacity-20" />
              <span className="text-xs font-medium tracking-wider uppercase opacity-20">
                Swipe
              </span>
            </>
          ) : (
            <>
              <FlipIcon className="w-5 h-5 opacity-20" />
              <span className="text-xs font-medium tracking-wider uppercase opacity-20">
                Tap to Show
              </span>
            </>
          )}
        </div>
      </div>
      <div
        className="absolute inset-5 rounded-xl opacity-5 select-none pointer-events-none"
        style={{
          backgroundImage: `url('/img/pattern_01.svg')`,
          backgroundSize: 'cover',
        }}
      />
      <div className="absolute bg-white text-3xl rounded-3xl bottom-0 right-0 w-14 h-14 inline-flex items-center justify-center text-opacity-50 text-black select-none pointer-events-none">
        🌱
      </div>
    </button>
  );
}
