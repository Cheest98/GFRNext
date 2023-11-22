"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";


interface ButtonProps {
  session: Session | null;
  data: any;
  action: (props: any) => void;
  label: string;
}

function TaskButton({ data, action, label, session }: ButtonProps) {
  return (
    <>
      <Button className="bg-primar-200" onClick={() => action({ data, session })}>
        {label}
      </Button>
    </>
  );
}

export default TaskButton;
