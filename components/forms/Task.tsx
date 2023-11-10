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
import { createTask } from "@/lib/actions/task.actions";
import { TaskValidation } from "@/lib/validations/task";
import SharedButton from "../shared/SharedButton";

interface UserProps {
  session: Session | null;
}

const Task = ({ session }: UserProps) => {
  const user = session?.user;

  const form = useForm<z.infer<typeof TaskValidation>>({
    resolver: zodResolver(TaskValidation),
    defaultValues: {
      task: "",
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
            name="task"
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
            action={createTask}
            label="Add"
          />
        </form>
      </Form>
    </>
  );
};

export default Task;
