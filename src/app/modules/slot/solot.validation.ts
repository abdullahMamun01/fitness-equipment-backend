import { z } from 'zod';

export const slotValidationSchema = z.object({
  body: z.object({
    service: z.string({ invalid_type_error: 'service id is required!' }), // ObjectId is typically represented as a string
    date: z
      .string({ invalid_type_error: 'date is required!' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format, must be YYYY-MM-DD'),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Invalid start time format!',
      }), // HH:MM
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Invalid end time format!',
      }), // HH:MM
  }),
});
