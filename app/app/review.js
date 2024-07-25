'use client';

import { useCardSet } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { HiSparkles as MagicIcon } from 'react-icons/hi2';
import {
  MdCheck as CheckIcon,
  MdClose as CrossIcon,
  MdFlip as FlipIcon,
  MdOutlineSwipe as SwipeIcon,
  MdTimer as TimerIcon,
} from 'react-icons/md';

export default function ReviewPage() {
  const { data, isLoading, isError } = useCardSet();
  const timerRef = useRef(null);

  return (
    <>
      <div className="bg-zinc-100 h-dvh flex flex-col"></div>
    </>
  );
}
