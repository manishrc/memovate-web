'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { signupAction } from './signup-action';

const initialState = {
  message: '',
};

export default function LoginForm() {
  const [state, formAction] = useFormState(signupAction, initialState);

  useEffect(() => {
    if (state?.message) {
      toast(state.message);
    }
    if (state?.error) {
      state.error.forEach((message) => {
        toast.error(message, { duration: Infinity });
      });
    }
  }, [state]);

  return state?.message ? (
    <div className="grid gap-3">
      <div className="text-xl font-bold text-center">{state.message}</div>
      <Button href="/login">Login</Button>
      <Button
        // Reload has a hack since it's not easy to reset the form `state`
        onClick={window.location.reload}
        variant="secondary"
      >
        Back
      </Button>
    </div>
  ) : (
    <div className="grid gap-3">
      <h1 className="text-xl font-semibold text-center py-8">
        Create your {process.env.NEXT_PUBLIC_APP_NAME} account
      </h1>
      <form
        className="grid gap-3"
        action={formAction}
        onSubmit={() => {
          toast.dismiss();
        }}
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Richard Feynman" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="richard.feynman@caltech.edu"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter password"
            required
          />
        </div>
        <Button type="submit" className="mt-3">
          Sign Up
        </Button>
        <p className="text-xs leading-relaxed text-zinc-500">
          By signing up, you agree to the{' '}
          <a className="font-medium hover:underline" href="">
            Terms of Service
          </a>{' '}
          and{' '}
          <a className="font-medium hover:underline" href="">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-3" disabled={pending}>
      {pending ? 'Signing up...' : 'Sign Up'}
    </Button>
  );
}
