import { Types } from 'mongoose';
import { z } from 'zod';

export const bookingValidationSchema = z.object({
  body: z.object({
    serviceId: z
      .string({ invalid_type_error: 'serviceId is required' })
      .refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid serviceId',
      }),
    slotId: z
      .string({ invalid_type_error: 'slotId is required' })
      .refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid slotId',
      }),
    vehicleType: z.enum([
      'car',
      'truck',
      'SUV',
      'van',
      'motorcycle',
      'bus',
      'electricVehicle',
      'hybridVehicle',
      'bicycle',
      'tractor',
    ]),
    vehicleBrand: z.string(),
    manufacturingYear: z.number(),
    registrationPlate: z.string(),
  }),
});
