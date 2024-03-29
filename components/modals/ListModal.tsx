"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { updateList } from "@/lib/actions/list.actions";
import { PriceValidation } from "@/lib/validations/list";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ListModalProps {
  session: Session | null;
  id: string;
  list: string;
  status: string;
  onClose: () => void;
  onStatusUpdate: () => void;
  products: Product[];
}

function ListModal({
  id,
  list,
  products,
  session,
  onStatusUpdate,
  onClose,
}: ListModalProps) {
  const form = useForm<z.infer<typeof PriceValidation>>({
    resolver: zodResolver(PriceValidation),
    defaultValues: {
      price: 0,
    },
  });

  const handleStatusUpdate = async (
    values: z.infer<typeof PriceValidation>
  ) => {
    try {
      console.log("Form values:", values);
      console.log("Form errors:", form.formState.errors);
      await updateList({
        data: {
          id,
          status: "Completed",
          price: Number(values.price),
        },
        session,
      });
      onStatusUpdate(); // Call the callback after updating
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="rounded-lg bg-dark-4">
        <DialogHeader>
          <DialogTitle className="text-1.5rem font-semibold text-light-1">
            {list}{" "}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {products.map((product) => (
            <div
              key={product.id}
              className="mt-1 flex justify-between items-center"
            >
              <p className="text-small-regular text-light-2">
                {product.product}
              </p>
            </div>
          ))}
        </DialogDescription>
        <DialogFooter>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleStatusUpdate)}
              className="flex items-center justify-start gap-2 w-full"
            >
              <p className="text-small-regular text-light-2 flex-shrink-0">
                Total Price:{" "}
              </p>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormControl>
                      <Input
                        type="number"
                        className="account-form_input no-focus"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-primary-500" type="submit">
                Completed
              </Button>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ListModal;
