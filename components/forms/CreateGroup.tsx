"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";

import { GroupValidation } from "@/lib/validations/group";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createGroup } from "@/lib/actions/group.actions";
import SharedButton from "../shared/SharedButton";
import { Textarea } from "../ui/textarea";

interface UserProps {
  session: Session | null;
}

const CreateGroup = ({ session }: UserProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = session?.user;

  const form = useForm<z.infer<typeof GroupValidation>>({
    resolver: zodResolver(GroupValidation),
    defaultValues: {
      name: "",
      description: "",
      password: "",
    },
  });

  const data = form.watch();
  return (
    <>
      <Form {...form}>
        <form className="flex flex-col justify-start gap-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Name
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
                    rows={10}
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
            name="password"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Password
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
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
            action={createGroup}
            label="Create Group"
          />
        </form>
      </Form>
    </>
  );
};

export default CreateGroup;
