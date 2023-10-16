"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import profilePicPlaceholder from "../../public/assets/profile-pic-placeholder.png";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="flex items-center gap-1">
      {user ? (
        <Image
          src={user?.image || profilePicPlaceholder}
          alt="Profile picture"
          width={40}
          height={40}
          className="w-10 rounded-full"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-5 w-5 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      )}

      {user ? (
        <button
          className="text-heading4-bold text-light-1 max-xs:hidden"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </button>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
}
