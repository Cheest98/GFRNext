import * as z from "zod";

export const ProductValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
  status: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(10, { message: "Maximum 1000 caracters." }),
});
