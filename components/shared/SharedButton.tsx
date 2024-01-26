"use client";

import { Button } from "@/components/ui/button";

interface ButtonProps {
  session: string;
  data: any;
  action: (props: any) => void;
  label: string;
}

function SharedButton({ session, data, action, label }: ButtonProps) {
  return (
    <>
      <Button
        className="bg-primary-500"
        onClick={() => action({ session, data })}
      >
        {label}
      </Button>
    </>
  );
}

export default SharedButton;
