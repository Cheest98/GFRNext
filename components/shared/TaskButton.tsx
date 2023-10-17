"use client";

import { Button } from "@/components/ui/button";

interface ButtonProps {
  data: any;
  action: (props: any) => void;
  label: string;
}

function TaskButton({ data, action, label }: ButtonProps) {
  return (
    <>
      <Button className="bg-primary-500" onClick={() => action({ data })}>
        {label}
      </Button>
    </>
  );
}

export default TaskButton;
