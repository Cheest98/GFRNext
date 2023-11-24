"use client";

import { Button } from "@/components/ui/button";

interface RegisterProps {
  action: (props: any) => void;
  data: {
    email: string;
    password: string;
  };
  type: string;
}

function RegisterButton({ data, action, type }: RegisterProps) {
  return (
    <>
      <Button
        type={type}
        className="bg-primary-500"
        onClick={() => action(data)} 
      >
        Register
      </Button>
    </>
  );
}

export default RegisterButton;
