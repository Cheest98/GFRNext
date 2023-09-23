"use client";

import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/actions/user.actions";
import { Session } from "next-auth";

interface UpdateUserProps {
  session: Session | null;
  data: {
    image?: string;
    name?: string;
    bio?: string;
    phone?: string;
  };
}

function EditButton({ session, data }: UpdateUserProps) {
  return (
    <>
      <Button
        className="bg-primary-500"
        onClick={() => updateUser({ session, data })}
      >
        Save
      </Button>
    </>
  );
}

export default EditButton;
