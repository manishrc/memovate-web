"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signInAction } from "./actions";

export function SignInForm({ next }) {
  const [state, formAction] = useFormState(signInAction, {});

  return (
    <form action={formAction}>
      <input type="hidden" name="next" value={next} />
      {/* {Object.values(providers).map((provider) => (
        <Button
          variant="outline"
          className="w-full"
          key={provider.name}
          onClick={() => signIn(provider.id)}
        >
          Login with {provider.name}
        </Button>
      ))} */}

      <SignInFormFields {...state} />
    </form>
  );
}

export function SignInFormFields({ error, data }) {
  const { pending } = useFormStatus();

  const inputRef = useRef(null);

  useEffect(() => {
    if (error && inputRef.current) {
      if (document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [error]);

  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            autoComplete="email"
            ref={inputRef}
            autoFocus
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Logging in..." : "Login with Email"}
        </Button>
        {error && "message" in error && !pending ? (
          <span className="text-red-500 text-sm"> {error.message}</span>
        ) : null}
        {data && "message" in data && !pending ? (
          <span className="text-green-500 text-sm"> {data.message}</span>
        ) : null}
      </div>
    </>
  );
}
