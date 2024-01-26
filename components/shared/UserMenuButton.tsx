"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function UserMenuButton() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <div className="flex items-center gap-1">
      {user ? (
        <button
          className="text-heading4-bold text-light-1 max-xs:hidden"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="text-heading4-bold text-light-1 max-xs:hidden"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </div>
  );
}
