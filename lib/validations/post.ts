import * as z from "zod";

export const PostValidation = z.object({
  picturePath: z.string().url().nonempty().optional(),
  content: z
    .string()
    .min(10, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
});
