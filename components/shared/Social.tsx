"use client"
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  }
    return (
        <div className="flex justify-center w-full">
          <Button
            size="lg"
            variant="outline"
            onClick={() => onClick("google")}
          >
            <FcGoogle className="h-5 w-5" />
          </Button>
        </div>
      );
}
