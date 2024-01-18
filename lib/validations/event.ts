import * as z from 'zod';

export const EventValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  date: z.string().refine(data => !isNaN(Date.parse(data)), {
      message: "Invalid date format",
  }),
  time: z.string().refine(data => /^([0-9]{2}):([0-9]{2})$/.test(data), {
      message: "Invalid time format",
  }),
  allDay: z.boolean(),
});