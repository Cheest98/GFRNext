"use client";

import { Session } from "next-auth";
import Image from "next/image";

interface ButtonProps {
  session: Session | null;
  data: any;
  action: (props: any) => void;
}

function GroupHeaderButton({ data, action, session }: ButtonProps) {
  return (
    <>
      <button className="bg-primary" onClick={() => action({ data, session })}>
        <Image
          src="/assets/create.svg"
          alt="Create"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
        />
      </button>
    </>
  );
}

export default GroupHeaderButton;
