import * as z from 'zod';

export const EventValidation = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    startDate: z.date(),
    endDate: z.date(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  });