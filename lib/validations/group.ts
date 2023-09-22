import * as z from "zod";

export const GroupValidation = z.object({
  image: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  description: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(200, { message: "Maximum 200 caracters." }),
});