"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginUserValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleSignInButton from "../shared/GoogleSignInButton";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const SignInForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof LoginUserValidation>>({
    resolver: zodResolver(LoginUserValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginUserValidation>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    console.log("logowanie", signInData);

    if (signInData?.error) {
      toast({
        title: "Error!",
        description: "Wrong credentials",
        variant: "destructive",
      });
    } else {
      window.location.href = "/";
    }
  };

  const data = form.watch();

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex flex-col justify-start gap-10"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="flex-1 text-base-semibold text-gray-200">
                  Email
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input
                    placeholder="mail@example.com"
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
                <FormLabel className="flex-1 text-base-semibold text-gray-200">
                  Password
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-6" type="submit">
            Sign in
          </Button>
        </form>

        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400  text-gray-200">
          or
        </div>
        <div>
          <div className="flex justify-center">
            <GoogleSignInButton> Sign up with Google</GoogleSignInButton>
          </div>
        </div>
        <p className="text-center text-sm text-gray-200">
          If you don't have an account, please
          <Link className=" text-gray-200 hover:underline" href="/register">
            Sign up
          </Link>
        </p>
      </Form>
    </>
  );
};

export default SignInForm;
