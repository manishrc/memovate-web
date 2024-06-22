'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useInView } from 'framer-motion';

import { Container } from '@/app/(marketing)/components/Container';
const reviews = [
  {
    title: 'Learning made easy!',
    body: `${process.env.NEXT_PUBLIC_APP_NAME} has completely transformed my study routine. The 10-minute daily recall sessions are a game-changer.`,
    author: 'HappyLearner',
    rating: 5,
  },
  {
    title: 'Best study app ever.',
    body: `Thanks to ${process.env.NEXT_PUBLIC_APP_NAME}, I remember everything I learn now. The interactive flashcards are so fun!`,
    author: 'MemoryMaster',
    rating: 5,
  },
  {
    title: 'Incredibly effective.',
    body: `${process.env.NEXT_PUBLIC_APP_NAME} makes memorization feel like a game. I look forward to my study sessions every day.`,
    author: 'StudyFanatic',
    rating: 5,
  },
  {
    title: 'Perfect for busy schedules.',
    body: `With just 10 minutes a day, ${process.env.NEXT_PUBLIC_APP_NAME} helps me stay on top of my learning goals. Amazing!`,
    author: 'EfficiencyExpert',
    rating: 5,
  },
  {
    title: 'A must-have app.',
    body: `${process.env.NEXT_PUBLIC_APP_NAME} makes learning fun and easy. I never thought I'd enjoy studying this much.`,
    author: 'EducationEnthusiast',
    rating: 5,
  },
  {
    title: 'So much fun!',
    body: `I love the gamified experience of ${process.env.NEXT_PUBLIC_APP_NAME}. It’s the best way to retain information.`,
    author: 'GameLover',
    rating: 5,
  },
  {
    title: 'Amazing results!',
    body: `I've seen a huge improvement in my memory retention thanks to ${process.env.NEXT_PUBLIC_APP_NAME}. Totally worth it!`,
    author: 'ResultOriented',
    rating: 5,
  },
  {
    title: 'Revolutionary!',
    body: `${process.env.NEXT_PUBLIC_APP_NAME} is a game-changer for anyone looking to improve their memory. 10/10 recommend!`,
    author: 'TechSavvyLearner',
    rating: 5,
  },
  {
    title: 'Daily routine made fun.',
    body: `The 10-minute recall sessions with ${process.env.NEXT_PUBLIC_APP_NAME} fit perfectly into my daily routine. Highly recommend!`,
    author: 'RoutineLover',
    rating: 5,
  },
  {
    title: 'Life-changing!',
    body: `I can't believe how much ${process.env.NEXT_PUBLIC_APP_NAME} has improved my learning process. It's a total game-changer!`,
    author: 'LifeLongLearner',
    rating: 5,
  },
  {
    title: 'Memory boost!',
    body: `Since using ${process.env.NEXT_PUBLIC_APP_NAME}, my ability to recall information has skyrocketed. Best app ever!`,
    author: 'MemoryBooster',
    rating: 5,
  },
  {
    title: 'Engaging and effective.',
    body: `The mix of AI and fun design in ${process.env.NEXT_PUBLIC_APP_NAME} makes studying feel less like a chore and more like a game.`,
    author: 'EngagedLearner',
    rating: 5,
  },
  {
    title: 'Fantastic app!',
    body: `${process.env.NEXT_PUBLIC_APP_NAME} takes away the stress of studying. The daily 10-minute sessions are perfect!`,
    author: 'StressFreeStudent',
    rating: 5,
  },
  {
    title: 'Better than expected.',
    body: `I didn't think an app could help me so much with my studies, but ${process.env.NEXT_PUBLIC_APP_NAME} proved me wrong.`,
    author: 'PleasantlySurprised',
    rating: 5,
  },
];

function StarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map((index) => (
        <StarIcon
          key={index}
          className={clsx(
            'h-5 w-5',
            rating > index ? 'fill-cyan-500' : 'fill-gray-300'
          )}
        />
      ))}
    </div>
  );
}

function Review({ title, body, author, rating, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = [
      '0s',
      '0.1s',
      '0.2s',
      '0.3s',
      '0.4s',
      '0.5s',
    ];
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ];
  }, []);

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5',
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base leading-7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  );
}

function splitArray(array, numParts) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

function ReviewColumn({ reviews, className, reviewClassName, msPerPixel = 0 }) {
  let columnRef = useRef(null);
  let [columnHeight, setColumnHeight] = useState(0);
  let duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) {
      return;
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration }}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  );
}

function ReviewGrid() {
  let containerRef = useRef(null);
  let isInView = useInView(containerRef, { once: true, amount: 0.4 });
  let columns = splitArray(reviews, 3);
  let column1 = columns[0];
  let column2 = columns[1];
  let column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= column1.length + column3[0].length &&
                  'md:hidden',
                reviewIndex >= column1.length && 'lg:hidden'
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  );
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          Everyone is changing their life with $
          {process.env.NEXT_PUBLIC_APP_NAME}.
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
          Thousands of people have doubled their net-worth in the last 30 days.
        </p>
        <ReviewGrid />
      </Container>
    </section>
  );
}
