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
import { createUser } from "@/lib/actions/user.actions";
import { RegisterUserValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleSignInButton from "../shared/GoogleSignInButton";
import RegisterButton from "../shared/RegisterButton";



const SignUpForm = () => {


  const form = useForm<z.infer<typeof RegisterUserValidation>>({
    resolver: zodResolver(RegisterUserValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
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
                <FormLabel className="flex-1 text-base-semibold text-gray-200" >Email</FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input
                  type="email" 
                  placeholder='mail@example.com'
                  className="account-form_input no-focus"
                  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="flex-1 text-base-semibold text-gray-200">Password</FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type='password'
                    placeholder='Enter your password'
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
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="flex-1 text-base-semibold text-gray-200">Re-Enter your password</FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    placeholder='Re-Enter your password'
                    type='password'
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <RegisterButton data={data} action={createUser} />
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400  text-gray-200'>
        or
      </div>
      <div>
      <div className="flex justify-center">
    <GoogleSignInButton label="Sign up with Google" />
      </div>
      </div>
      <p className='text-center text-sm text-gray-200'>
        If you  have an account, please 
        <Link className=' text-gray-200 hover:underline' href='/signin'>
           Sign in
        </Link>
      </p>
    </Form>
    </>
  );
};

export default SignUpForm;
