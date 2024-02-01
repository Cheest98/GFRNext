"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createGroup } from "@/lib/actions/group.actions";
import { GroupValidation } from "@/lib/validations/group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface CreateGroupProps {
  session: Session | null;
  onClose: () => void;
}

function CreateGroupModal({ session, onClose }: CreateGroupProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof GroupValidation>>({
    resolver: zodResolver(GroupValidation),
    defaultValues: {
      name: "",
      description: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof GroupValidation>) {
    console.log(values);
    try {
      await createGroup({
        data: {
          name: values.name,
          description: values.description,
          password: values.password,
        },
        session,
      });
      console.log("Group created successfully");
      onClose();
      form.reset();
      await getSession();
      router.push('/')
    } catch (error: any) {
      console.error("Error creating Group:", error.message);
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="rounded-lg bg-dark-4">
        <DialogHeader>
          <DialogTitle className="text-1.5rem font-semibold text-light-1">
            Create Group
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-start gap-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1">
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
                <FormItem className="flex w-full flex-col gap-1">
                  <FormLabel className="text-base-semibold text-light-2">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
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
                <FormItem className="flex w-full flex-col gap-1">
                  <FormLabel className="text-base-semibold text-light-2">
                    Password
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
            <DialogFooter>
              <div className=" flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
                <button className="bg-primary" type="submit">
                  <div className=" flex cursor-pointer gap-1 rounded-lg bg-dark-3 ">
                    <Image
                      src="/assets/create.svg"
                      alt="Create"
                      width={14}
                      height={14}
                      className="cursor-pointer object-contain"
                    />
                    <p className="text-light-2 max-sm:hidden">Create</p>
                  </div>
                </button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateGroupModal;
