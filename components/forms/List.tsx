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
import { TaskValidation } from "@/lib/validations/task";
import SharedButton from "../shared/SharedButton";
import { Button } from "../ui/button";
import { createTask } from "@/lib/actions/task.actions";
import { ListValidation } from "@/lib/validations/list";
import { createList } from "@/lib/actions/list.actions";

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
      <h1 className="head-text text-left">Create Task</h1>
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
