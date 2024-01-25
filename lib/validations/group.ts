import * as z from "zod";

export const GroupValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  description: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(200, { message: "Maximum 200 caracters." }),
  password: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(200, { message: "Maximum 200 caracters." }),
});

export const UpdateGroupValidation = z.object({
  groupImage: z.string().optional(),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  description: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(200, { message: "Maximum 200 caracters." }),
});


export const JoinGroupValidation = z.object({
  password: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(200, { message: "Maximum 200 caracters." }),
});
