"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface ButtonProps {
  label: string;
}

function GoogleSignInButton({label}: ButtonProps) {
  return (
    <>
      <Button className="bg-primary-500" onClick={() => signIn() }>
        {label}
      </Button>
    </>
  );
}

export default GoogleSignInButton;
