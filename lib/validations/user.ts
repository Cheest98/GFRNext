import * as z from "zod";

export const UserValidation = z.object({
  image: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
  phone: z
    .string()
    .min(9, { message: "Minimum 3 characters." })
    .max(14, { message: "Maximum 1000 caracters." }),
});
