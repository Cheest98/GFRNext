"use client";

import { Button } from "@/components/ui/button";
import { createProduct } from "@/lib/actions/list.actions";
import { Session } from "next-auth";

interface CreateProductProps {
  listId: string;
  action: (props: any) => void;
  data: {
    name: string;
  };
}

function AddButton({ listId, data, action }: CreateProductProps) {
  return (
    <>
      <Button
        className="bg-primary-500"
        onClick={() => action({ listId, data })}
      >
        Add product
      </Button>
    </>
  );
}

export default AddButton;
