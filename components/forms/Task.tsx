"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { createTask } from "@/lib/actions/task.actions";
import { TaskValidation } from "@/lib/validations/task";
import SharedButton from "../shared/SharedButton";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface UserProps {
  session: Session | null;
}

const Task = ({ session }: UserProps) => {
  const user = session?.user;

  const form = useForm<z.infer<typeof TaskValidation>>({
    resolver: zodResolver(TaskValidation),
    defaultValues: {
      task: "",
      description: "",
    },
    
  });

  async function onSubmit( values: z.infer<typeof TaskValidation>){
    console.log(values); // Debug log
    try {
      await createTask({ data: { task: values.task, description: values.description }, session });
      console.log("Task created successfully");
      form.reset()
    } catch (error: any) {
      console.error("Error creating task:", error.message);
      // Consider providing user feedback here
    }
  };


  return (
    <>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)}  className="flex flex-col justify-start gap-10">
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                 <FormLabel className="text-base-semibold text-light-2">
                  Task
                </FormLabel>
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={2}
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
    </>
  );
};

export default Task;
