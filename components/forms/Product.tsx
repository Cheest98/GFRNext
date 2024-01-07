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
import { Button } from "../ui/button";

interface ListProps {
  listId: string;
  onProductAdded: () => Promise<void>;
}

const Product = ({ listId, onProductAdded }: ListProps) => {
  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      product: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductValidation>) => {
    try {
      await createProduct({ data: { product: values.product }, listId });
      console.log("Product created successfully");
      form.reset();
      await onProductAdded();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex justify-start gap-10"
        >
          <FormField
            control={form.control}
            name="product"
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
          <Button className="bg-primary-500" type="submit">
            Add
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Product;
