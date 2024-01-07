"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

interface ButtonProps {
  joinGroupId: string;
  session: Session | null;
  action: (props: any) => void;
  password: string;
  label: string;
}

function JoinButton({
  session,
  action,
  label,
  joinGroupId,
  password,
}: ButtonProps) {
  return (
    <>
      <Button
        className="bg-primary-500"
        onClick={() => action({ session, joinGroupId, password })}
      >
        {label}
      </Button>
    </>
  );
}

export default JoinButton;
