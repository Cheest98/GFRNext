"use client";

import { Button } from "@/components/ui/button";

interface RegisterProps {
  action: (props: any) => void;
  data: {
    email: string;
    password: string;
  };
}

function RegisterButton({ data: { email, password }, action }: RegisterProps) {
    return (
      <>
        <Button
          className="bg-primary-500"
          onClick={() => action({ email, password })}
        >
          Register
        </Button>
      </>
    );
  }

export default  RegisterButton;