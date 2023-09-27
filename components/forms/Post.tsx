"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

import React from "react";
import { PostValidation } from "@/lib/validations/post";
import { Input } from "@/components/ui/input";
import { createPost } from "@/lib/actions/post.actions";
import SharedButton from "../shared/SharedButton";
import { Textarea } from "../ui/textarea";

interface UserProps {
  session: Session | null;
}

const Post = ({ session }: UserProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const user = session?.user;

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      picturePath: "",
      content: "",
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const data = form.watch();

  return (
    <>
      <h1 className="head-text text-left">Create post</h1>
      <Form {...form}>
        <form className="mt-10 flex flex-col justify-start gap-10">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="picturePath"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Add profile photo"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <SharedButton
            session={session}
            data={data}
            action={createPost}
            label="Add"
          />
        </form>
      </Form>
    </>
  );
};

export default Post;
