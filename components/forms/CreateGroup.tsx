"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GroupValidation } from "@/lib/validations/group";
import { Session } from "next-auth";
import { Input } from "@/components/ui/input";
import { createGroup } from "@/lib/actions/group.actions";

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
    },
  });

  const onSubmit = async (values: z.infer<typeof GroupValidation>) => {
    const userId = session?.user.id;
    if (!userId) {
      console.error("User ID is missing.");
      return;
    }
    console.log("Submitting form...");

    try {
      await createGroup({ session, data: values });
      console.log("Group created");
      console.error({ session, values });
    } catch (error) {
      console.error(error);
      console.error(error);
      console.error({ session, values });
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Create Group
        </Button>
      </form>
    </Form>
  );
};

export default CreateGroup;
