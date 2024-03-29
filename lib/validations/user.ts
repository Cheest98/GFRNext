import * as z from "zod";

export const UserValidation = z.object({
  userImage: z.string().url().optional(),
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

export const RegisterUserValidation = z.object({
  email: z
    .string()
    .min(5, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(5, { message: "Minimum 5 characters." }),
  confirmPassword: z.string().min(1, "Password confirmation is required"),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],  // Corrected typo here
  message: 'Passwords do not match'
});

export const LoginUserValidation = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
