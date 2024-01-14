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
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { createPost } from "@/lib/actions/post.actions";
import { PostValidation } from "@/lib/validations/post";
import { Button } from "../ui/button";
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
      picturePath: null,
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

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    console.log(values); // Debug log
    try {
      const picturePath = values.picturePath || "";
      await createPost({
        data: { picturePath, content: values.content },
        session,
      });
      console.log("Task created successfully");
      form.reset();
    } catch (error: any) {
      console.error("Error creating task:", error.message);
    }
  }

  const data = form.watch();

  return (
    <>
      <h1 className="head-text text-left">Create post</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex flex-col justify-start gap-10 rounded-lg"
        >
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

          <Button type="submit" className="bg-primary-500">
            Add Post
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Post;
