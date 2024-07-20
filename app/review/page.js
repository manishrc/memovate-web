import { cn } from '@/lib/utils';
import {
  MdTimer as TimerIcon,
  MdCheck as CheckIcon,
  MdClose as CrossIcon,
  MdFlip as FlipIcon,
  MdOutlineSwipe as SwipeIcon,
} from 'react-icons/md';

import { HiSparkles as MagicIcon } from 'react-icons/hi2';
const data = {
  card_set_id: '49bb7bf2-33e6-4add-8e61-b32181995a17',
  user_id: 'd06c013d-6849-4f6e-ab54-be46f546dc9e',
  cards: [
    {
      id: 'c5f4641a-47c0-4853-b9b4-e547c0a886da',
      front_card_face_text:
        "What is the most abundant gas in Earth's atmosphere?",
      back_card_face_text: 'Nitrogen',
      baseline_response_time: null,
      next_review_at: null,
      ease_factor: null,
      has_review: false,
    },
    {
      id: 'ba217424-904f-4fa0-ad76-511b3a19cde6',
      front_card_face_text: 'What is the speed of light?',
      back_card_face_text: '299,792,458 meters per second',
      baseline_response_time: null,
      next_review_at: null,
      ease_factor: null,
      has_review: false,
    },
    {
      id: 'b01a7ec9-4102-4502-b302-c62cdb573ab6',
      front_card_face_text: 'What planet is known for its rings?',
      back_card_face_text: 'Saturn',
      baseline_response_time: null,
      next_review_at: null,
      ease_factor: null,
      has_review: false,
    },
    {
      id: '73b675cf-3f20-4d03-8aee-d7c571d203c3',
      front_card_face_text: 'What is the chemical symbol for gold?',
      back_card_face_text: 'Au',
      baseline_response_time: null,
      next_review_at: null,
      ease_factor: null,
      has_review: false,
    },
    {
      id: 'd23c40e7-d6d0-4d05-a484-178c1d905f05',
      front_card_face_text: 'What is the time complexity of binary search?',
      back_card_face_text: 'O(log n)',
      baseline_response_time: null,
      next_review_at: null,
      ease_factor: null,
      has_review: false,
    },
    {
      id: '9b0e9b5d-31df-4774-be18-3882bd50c881',
      front_card_face_text:
        'What is the main ingredient in traditional Japanese miso soup?',
      back_card_face_text: 'Miso paste',
      baseline_response_time: null,
      next_review_at: null,
      ease_factor: null,
      has_review: false,
    },
    {
      id: '4d33a483-cbf4-4290-9449-17511898728f',
      front_card_face_text: 'Who formulated the theory of relativity?',
      back_card_face_text: 'Albert Einstein',
      baseline_response_time: null,
      next_review_at: null,
      ease_factor: null,
      has_review: false,
    },
    {
      id: '826c42bd-9fed-4b85-a596-ba0d7c331be9',
      front_card_face_text: 'Who painted the Mona Lisa?',
      back_card_face_text: 'Leonardo da Vinci',
      baseline_response_time: null,
      next_review_at: null,
      ease_factor: null,
      has_review: false,
    },
    {
      id: 'f3057c9c-f2c7-4b81-b54f-33ec9e9d40f0',
      front_card_face_text: 'What does CPU stand for?',
      back_card_face_text: 'Central Processing Unit',
      baseline_response_time: null,
      next_review_at: null,
      ease_factor: null,
      has_review: false,
    },
    {
      id: 'cf4879ea-bee1-43c8-b95d-44d115f622b4',
      front_card_face_text: 'What is the largest planet in our solar system?',
      back_card_face_text: 'Jupiter',
      baseline_response_time: null,
      next_review_at: null,
      ease_factor: null,
      has_review: false,
    },
  ],
};

export default function ReviewPage() {
  return (
    <>
      <div className="bg-zinc-100 h-dvh flex flex-col">
        <div className="pt-3 px-4">
          <SegmentProgress total={10} current={4} />
          <div className="flex justify-between mt-1">
            <button className="w-11 h-11 inline-flex items-center justify-center -ml-2.5 opacity-30">
              <CrossIcon className="h-6 w-6" />
            </button>
            <div className="inline-flex items-center gap-1">
              <span className="font-bold tabular-nums text-base opacity-30">
                0.244
              </span>
              <TimerIcon className="h-5 w-5 text-black opacity-30" />
            </div>
          </div>
        </div>
        <div className="px-4 mt-1">
          <Card
            front={data.cards[0].front_card_face_text}
            back={data.cards[0].back_card_face_text}
            reveal
          />
        </div>
        <div className="mt-3">
          <ActionBar />
        </div>
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

function Card({ front = '', back = '', reveal = false }) {
  const frontLength = front.length;
  const backLength = back.length;

  return (
    <>
      <div className="relative rounded-2xl drop-shadow bg-white p-8 w-full aspect-[1/1.4]">
        <div className="flex flex-col">
          <div
            className={cn(
              'mb-6 text-xl font-bold transition-all opacity-100 text-balance',
              frontLength < 54
                ? 'text-2xl leading-tight tracking-tight'
                : 'text-lg',
              reveal && 'opacity-90 text-base'
            )}
          >
            {front}
          </div>
          {reveal && (
            <div className="font-bold text-2xl leading-tight tracking-tight transition-all opacity-100">
              {back}
            </div>
          )}
        </div>
        <div className="absolute z-10 bottom-1 left-0 right-0 text-center">
          <div className="items-center inline-flex gap-2 bg-white px-3 py-1.5 rounded-sm select-none pointer-events-none">
            {reveal ? (
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
          className="absolute inset-5 rounded-xl opacity-10 select-none pointer-events-none"
          style={{
            backgroundImage: `url('/img/pattern_01.svg')`,
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute bg-white text-3xl rounded-3xl bottom-0 right-0 w-14 h-14 inline-flex items-center justify-center text-opacity-50 text-black select-none pointer-events-none">
          🌱
        </div>
      </div>
    </>
  );
}

function ActionBar({ reveal }) {
  return (
    <div className="flex items-center gap-3 justify-center">
      {!reveal ? (
        <>
          <button className="active:shadow-sm transition-all select-none active:bg-zinc-50 p-3 bg-white rounded-full shadow-md">
            <CheckIcon className="fill-green-600 w-6 h-6" />
          </button>
          <button className="active:shadow-sm transition-all select-none active:bg-zinc-50 p-2.5 bg-white rounded-full shadow-md">
            <MagicIcon className="fill-sky-500 w-5 h-5" />
          </button>
          <button className="active:shadow-sm transition-all select-none active:bg-zinc-50 p-3 bg-white rounded-full shadow-md">
            <CrossIcon className="fill-red-600 w-6 h-6" />
          </button>
        </>
      ) : (
        <button className="bg-black rounded-full text-white px-3 py-1.5">
          Show Answer
        </button>
      )}
    </div>
  );
}
