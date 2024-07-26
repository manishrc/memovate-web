'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState, useFormStatus } from 'react-dom';
import { loginAction } from './login-action';
import { toast } from 'sonner';
import { useEffect } from 'react';

const initialState = {
  message: '',
  error: [],
};

export default function LoginForm() {
  const [state, formState] = useFormState(loginAction, initialState);

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

  return (
    <div className="grid gap-3">
      <h1 className="text-xl font-semibold text-center py-8">
        Login to your {process.env.NEXT_PUBLIC_APP_NAME} account
      </h1>

      <form className="grid gap-3" action={formState}>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            className=""
            id="username"
            name="username"
            autoComplete="username"
            placeholder="richard.feynman@caltech.edu"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            className=""
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter password"
            required
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full mt-3" type="submit" disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
    </Button>
  );
}
