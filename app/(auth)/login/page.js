import LoginWithDropbox from '../login-dropbox.server';
import LoginWithEmail from '../login-email.client';
import LoginWithGitHub from '../login-github.server';

// TODO: Handle erros from OAuth based on error param

export default function LoginForm() {
  return (
    <div className="grid gap-3">
      <h1 className="text-xl font-semibold text-center py-8">
        Login to your {process.env.NEXT_PUBLIC_APP_NAME} account
      </h1>
      <LoginWithEmail />
      <LoginWithGitHub />
      <LoginWithDropbox />
    </div>
  );
}
