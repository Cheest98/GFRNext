"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { createList } from "@/lib/actions/list.actions";
import { ListValidation } from "@/lib/validations/list";
import { Button } from "../ui/button";

interface UserProps {
  session: Session | null;
}

const List = ({ session }: UserProps) => {
  const user = session?.user;

  const form = useForm<z.infer<typeof ListValidation>>({
    resolver: zodResolver(ListValidation),
    defaultValues: {
      list: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ListValidation>) {
    console.log(values);
    try {
      await createList({ data: { list: values.list }, session });
      console.log("List created successfully");
      form.reset();
    } catch (error: any) {
      console.error("Error creating List:", error.message);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex justify-start gap-10"
        >
          <FormField
            control={form.control}
            name="list"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="bg-primary-500" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default List;
