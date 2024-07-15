'use client';
import { signOut } from 'next-auth/react';
export default function SignOutButton(props) {
  return (
    <button
      className="text-sm"
      type="button"
      {...props}
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `/login`,
        })
      }
    >
      Sign Out
    </button>
  );
}
