import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginForm() {
  return (
    <div className="grid gap-3">
      <h1 className="text-xl font-semibold text-center py-8">
        Create your {process.env.NEXT_PUBLIC_APP_NAME} account
      </h1>

      <form
        className="grid gap-3"
        action={async (formData) => {
          'use server';

          const { email, password, name } = Object.fromEntries(formData);
          try {
            const response = await fetch(`${process.env.BACKEND_URL}/users`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
                name,
              }),
              redirect: 'follow',
            });
            if (!response.ok) return null;

            return response.json();
          } catch (error) {
            console.error('SignupForm server action:', error);
          }
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
            placeholder="richard.feynman@caltech.edu"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            required
          />
        </div>
        <Button type="submit" className="mt-3">
          Sign Up
        </Button>
      </form>

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
    </div>
  );
}
