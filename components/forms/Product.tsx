"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { createProduct } from "@/lib/actions/list.actions";
import { ProductValidation } from "@/lib/validations/product";
import AddButton from "../shared/AddButton";

interface ListProps {
  listId: string;
  refreshProductList: () => Promise<void>;
}

const Product = ({ listId, refreshProductList  }: ListProps) => {
  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      name: "",
    },
  });


  const onSubmit = async (data: z.infer<typeof ProductValidation>) => {
    try {
      await createProduct({ listId, data });
      form.reset();
      await refreshProductList(); // Ensure that this is called after the product is created
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex justify-start gap-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
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
          <AddButton listId={listId} data={form.getValues()} action={createProduct} />
          </form>
      </Form>
    </>
  );
};

export default Product;
