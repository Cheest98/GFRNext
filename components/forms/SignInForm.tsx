"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { LogiInUser } from "@/lib/actions/user.actions";
import { LoginUserValidation } from "@/lib/validations/user";
import RegisterButton from "../shared/RegisterButton";
import GoogleSignInButton from "../shared/GoogleSignInButton";
import Link from "next/link";


const SingIn = () => {

  const form = useForm<z.infer<typeof LoginUserValidation>>({
    resolver: zodResolver(LoginUserValidation),
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
            name='email'
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="flex-1 text-base-semibold text-gray-200" >Email</FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input placeholder='mail@example.com'
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
        If you don't have an account, please 
        <Link className=' text-gray-200 hover:underline' href='/register'>
           Sign  up
        </Link>
      </p>
    </Form>
    </>
  );
};

export default SingIn;
