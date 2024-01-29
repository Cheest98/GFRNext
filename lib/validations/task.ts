import * as z from "zod";

export const TaskValidation = z.object({
  task: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(20, { message: "Maximum 20 caracters." }),
    description: z
    .string()
    .max(200, { message: "Maximum 200 caracters." }),
});
