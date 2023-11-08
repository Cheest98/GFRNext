"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { createUser } from "@/lib/actions/user.actions";
import { RegisterUserValidation } from "@/lib/validations/user";
import RegisterButton from "../shared/RegisterButton";


const Register = () => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof RegisterUserValidation>>({
    resolver: zodResolver(RegisterUserValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const data = form.watch();

  return (
    <>
      <Form {...form}>
        <form className="mt-10 flex flex-col justify-start gap-10">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Input
                    type="email"
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
              <FormItem className="flex items-center gap-4">
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                    type="password"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

<RegisterButton data={data} action={createUser} />
        </form>
      </Form>
    </>
  );
};

export default Register;
