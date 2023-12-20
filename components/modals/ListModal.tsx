"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { updateList } from "@/lib/actions/list.actions";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { PriceValidation } from "@/lib/validations/list";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

interface ListModalProps {
    session: Session | null;
    id: string;
    list: string;
    status: string;
    onClose: () => void;
    onStatusUpdate: () => void; 
  }

 function ListModal({ id, list, status,  session,onStatusUpdate ,  onClose }: ListModalProps) {

  const form = useForm<z.infer<typeof PriceValidation>>({
    resolver: zodResolver(PriceValidation),
    defaultValues: {
      price: 0
    },
  });

  const handleStatusUpdate = async (values: z.infer<typeof PriceValidation>) => {
    try {
      console.log("Form values:", values);
      console.log("Form errors:", form.formState.errors);
      await updateList({
        data: { 
          id, 
          status: "Completed", 
          price: Number(values.price), 
        },
        session
      });
      onStatusUpdate(); // Call the callback after updating
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

    return (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent className="rounded-lg bg-dark-4" >
            <DialogHeader>
              <DialogTitle className="text-1.5rem font-semibold text-light-1">{list} </DialogTitle>
            </DialogHeader>
            <DialogDescription>
                <p className="text-light-1"> Task1</p>
                <p className="text-light-1"> Task2</p>
                <p className="text-light-1"> Task3</p>
                <p className="text-light-1"> Task4</p>
            </DialogDescription>
            <div className="grid gap-4 py-4">
                <div className="mt-auto flex items-center gap-3" />
            </div>
            <DialogFooter>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleStatusUpdate)} className="mt-10 flex justify-start gap-10">
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
                <Button  className="bg-primary-500" type="submit">Submit</Button>
               </form>
               </Form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }

export default ListModal;
