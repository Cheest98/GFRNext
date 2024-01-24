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
import { RegisterUserValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CardWrapper } from "../shared/CardWrapper";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { createUser } from "@/lib/actions/user.actions";

const SignUpFormTest = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterUserValidation>>({
    resolver: zodResolver(RegisterUserValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterUserValidation>) => {
    try {
      const response = await createUser({
        data: { email: values.email, password: values.password },
      });
      if (response.success) {
        toast({
          title: "Success",
          description: "User created successfully",
          variant: "default", // Change variant to test
          duration: 5000,
        });
        console.log("Response from createUser:", response);
        window.location.href = "/singin";
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
        duration: 5000,
      });
      console.error("Error in createUser:", error);
    }
  };

  return (
    <CardWrapper
      headerLabel="Create an Account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/signin"
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
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="flex-1 text-base-semibold text-gray-200">
                  Email
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input
                    type="email"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="flex-1 text-base-semibold text-gray-200">
                  Re-Enter your password
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    placeholder="Re-Enter your password"
                    type="password"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" bg-dark-3 text-light-1">
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignUpFormTest;
