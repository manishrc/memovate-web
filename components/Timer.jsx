'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

const Timer = forwardRef(function Timer({}, ref) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  useImperativeHandle(ref, () => ({
    getTime: () => time,
    setTimeMs: (newTime) => setTime(newTime),
    pause: () => setIsPaused(true),
    resume: () => {
      setIsPaused(false);
      previousTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(tick);
    },
    reset: () => {
      setTime(0);
      setIsPaused(false);
    },
  }));

  const tick = (timestamp) => {
    if (previousTimeRef.current !== undefined && !isPaused) {
      const deltaTime = timestamp - previousTimeRef.current;
      setTime((prevTime) => prevTime + Math.round(deltaTime));
    }
    previousTimeRef.current = timestamp;
    requestRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (!isPaused) {
      requestRef.current = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused]);

  return <>{time}</>;
});

export default Timer;
