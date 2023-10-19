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
import SharedButton from "../shared/SharedButton";

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

  const data = form.watch();

  return (
    <>
      <h1 className="head-text text-left">Create List</h1>
      <Form {...form}>
        <form className="mt-10 flex justify-start gap-10">
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

          <SharedButton
            session={session}
            data={data}
            action={createList}
            label="Add"
          />
        </form>
      </Form>
    </>
  );
};

export default List;
