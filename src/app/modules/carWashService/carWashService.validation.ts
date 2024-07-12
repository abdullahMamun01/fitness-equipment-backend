import { z } from 'zod';

export const createCarWashServiceValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'name is required!' }),
    description: z.string({ invalid_type_error: 'Description is required!' }),
    price: z.number({ invalid_type_error: 'price is required!' }),
    duration: z.number({ invalid_type_error: 'duration is required!' }),
    isDeleted: z.boolean().default(false),
  }),
});

export const update_CarWashService_ValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string({ invalid_type_error: 'name must be a string' })
        .optional(),
      description: z
        .string({ invalid_type_error: 'description must be a string' })
        .optional(),
      price: z
        .number({ invalid_type_error: 'price must be a number' })
        .optional(),
      duration: z
        .number({ invalid_type_error: 'duration must be a number' })
        .optional(),
      isDeleted: z.boolean().default(false).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
    }),
});
