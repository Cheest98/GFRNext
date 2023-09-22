import * as z from "zod";

export const UserValidation = z.object({
  image: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." })
    .optional(),
  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." })
    .optional(),
  phone: z
    .string()
    .min(9, { message: "Minimum 9 characters." })
    .max(14, { message: "Maximum 14 caracters." })
    .optional(),
});
