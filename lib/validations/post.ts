import * as z from "zod";

export const PostValidation = z.object({
  picturePath: z.string().url().optional().nullable(), // Allow null values
  content: z
    .string()
    .min(10, { message: "Minimum 10 characters." })
    .max(1000, { message: "Maximum 1000 characters." })
    .nonempty({ message: "Post is required." }),
});