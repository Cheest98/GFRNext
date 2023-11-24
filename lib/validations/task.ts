import * as z from "zod";

export const TaskValidation = z.object({
  task: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
    description: z
    .string()
    .max(200, { message: "Maximum 200 caracters." }),
  status: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(10, { message: "Maximum 1000 caracters." }),
});
