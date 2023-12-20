import * as z from "zod";

export const ListValidation = z.object({
  list: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
});

export const ProdcutValidation = z.object({
  product: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
});

export const PriceValidation = z.object({
  price: z
    .coerce 
    .number()
    .min(0),
});