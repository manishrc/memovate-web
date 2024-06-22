import LoginWithDropbox from '../login-dropbox.server';
import LoginWithEmail from '../login-email.client';
import LoginWithGitHub from '../login-github.server';

// TODO: Handle erros from OAuth based on error param
export default function LoginForm() {
  return (
    <div className="grid gap-3">
      <h1 className="text-xl font-semibold text-center py-8">
        Create your {process.env.NEXT_PUBLIC_APP_NAME} account
      </h1>
      <LoginWithEmail />
      <LoginWithGitHub />
      <LoginWithDropbox />

      <p className="text-xs leading-loose text-zinc-500">
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
