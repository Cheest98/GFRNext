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
import { CardWrapper } from "../shared/CardWrapper";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

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
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    console.log("logowanie", signInData);

    if (signInData?.error) {
      toast({
        title: "Error!",
        description: "Wrong credentials",
        variant: "destructive",
      });
    }
  };
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-2 flex flex-col justify-start gap-4"
        >

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1">
                  <FormLabel className="flex-1 text-base-semibold text-gray-200">
                    Email
                  </FormLabel>
                  <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                    <Input
                      placeholder="mail@example.com"
                      className="account-form_input no-focus"
                      type="email"
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
                  <FormLabel className="flex-1 text-base-semibold text-gray-200">
                    Password
                  </FormLabel>
                  <FormControl className="flex-1 text-base-semibold text-gray-200">
                    <Input
                      type="password"
                      placeholder="******"
                      className="account-form_input no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button type="submit" className=" bg-dark-3 text-light-1" >Login</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignInForm;
