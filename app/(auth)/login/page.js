import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { signIn } from '@/auth';

export default function LoginForm() {
  return (
    <div className="grid gap-3">
      <h1 className="text-xl font-semibold text-center py-8">
        Login to your {process.env.NEXT_PUBLIC_APP_NAME} account
      </h1>
      <form
        className="grid gap-3"
        action={async (formData) => {
          'use server';
          const { username, password } = Object.fromEntries(formData);
          return await signIn('credentials', {
            username,
            password,
            redirectTo: '/app',
          });
        }}
      >
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            className=""
            id="username"
            name="username"
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
            placeholder="Enter password"
            required
          />
        </div>
        <Button className="w-full mt-3" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
