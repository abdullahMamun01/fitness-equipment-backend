import { z } from 'zod';

const userRegisterValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z
      .string({ required_error: 'email is required' })
      .email({ message: 'Invalid email address' })
      // eslint-disable-next-line no-useless-escape
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
        message: 'Invalid email format',
      }),
    password: z.string({ required_error: 'password is required!' }),
    phone: z
      .string({ required_error: 'phone number is required' })
      .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format' }),
    role: z.enum(['user', 'admin']).default('user'),
    address: z.string({ required_error: 'Address is required' }),
  }),
});

export default userRegisterValidationSchema;
