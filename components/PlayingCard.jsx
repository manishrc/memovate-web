'use client';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

const buttonVariants = cva('block relative bg-white w-full aspect-[10/14]', {
  variants: {
    size: {
      sm: 'border-[3px] rounded-[3px] max-w-24 border-white shadow-[0_2px_12px_-6px_rgba(0,0,0,0.3)]',
      md: 'border-[8px] rounded-[8px] max-w-48 border-white shadow-[0_4px_24px_-10px_rgba(0,0,0,0.3)]',
      lg: 'border-[16px] rounded-[16px] max-w-96 border-white shadow-[0_8px_32px_-15px_rgba(0,0,0,0.3)]',
      xl: 'border-[24px] rounded-[24px] max-w-md border-white shadow-[0_16px_48px_-15px_rgba(0,0,0,0.3)]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export default function PlayingCard({
  children,
  asChild,
  size,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp className={cn(buttonVariants({ size, className }))} {...props}>
      <div
        className="absolute inset-0 rounded-xl opacity-10 select-none pointer-events-none border-"
        style={{
          backgroundImage: `url('/img/pattern_01.svg')`,
          backgroundSize: 'cover',
        }}
      />
      {children}
    </Comp>
  );
}
