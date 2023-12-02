"use client";

import { Session } from "next-auth";
import Image from "next/image";

interface ButtonProps {
  session: Session | null;
  data: any;
  src: string;
  alt:string
  action: (props: any) => void;
}

function DeleteButton({ data, action, session, src, alt }: ButtonProps) {
  return (
    <>
      <button  className="bg-primary" onClick={() => action({ data, session })}>
      <Image
                  src={src}
                  alt={alt}
                  width={14}
                  height={14}
                  className='cursor-pointer object-contain'
                />
      </button>
    </>
  );
}

export default DeleteButton;
