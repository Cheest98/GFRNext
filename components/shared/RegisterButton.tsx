"use client";

import { Button } from "@/components/ui/button";

interface RegisterProps {
  action: (props: any) => void;
  data: {
    email: string;
    password: string;
  };
}

function RegisterButton({ data, action }: RegisterProps) {
    return (
      <>
        <Button
          className="bg-primary-500"
          onClick={() => action({ data })}
        >
          Register
        </Button>
      </>
    );
  }

export default  RegisterButton;