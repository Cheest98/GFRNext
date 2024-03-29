import * as z from "zod";

export const ProductValidation = z.object({
  product: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
});
