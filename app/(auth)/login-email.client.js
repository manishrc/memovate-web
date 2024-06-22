"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signInAction } from "./actions";

export default function LoginWithEmail({ next }) {
  const [inUse, setInUse] = useState(false);
  const [state, formAction] = useFormState(signInAction, {});
  const { pending } = useFormStatus();

  const inputRef = useRef(null);

  const { error, data } = state;

  useEffect(() => {
    if (error && inputRef.current) {
      if (document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [error]);

  return (
    <form action={formAction}>
      <input type="hidden" name="next" value={next} />
      {inUse ? (
        <div className="pt-3 border-t">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            autoComplete="email"
            ref={inputRef}
            autoFocus
          />
          {error && "message" in error && !pending ? (
            <div className="text-red-500 text-xs mt-2">{error.message}</div>
          ) : null}
          <SubmitButton />
        </div>
      ) : (
        <>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            type="button"
            onClick={() => setInUse(true)}
          >
            Continue with Email
          </Button>
        </>
      )}

      {data && "message" in data && !pending ? (
        <div className="text-sm absolute inset-0 bg-zinc-50 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <p className="text-xl font-medium">Check your email </p>
            <p className="mt-4 text-balance leading-relaxed">
              We&apos;ve sent a temporary login link. <br />
              Please check your inbox at{" "}
              <span className="font-medium">{inputRef.current.value}</span>.
            </p>
            <div className="mt-16">
              <Button
                variant="ghost"
                className="text-xs font-medium text-zinc-500"
                type="reset"
              >
                Back to login
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      size="lg"
      variant=""
      type="submit"
      className="w-full mt-3"
      disabled={pending}
    >
      {pending ? "Logging in..." : "Continue with Email"}
    </Button>
  );
}
