import { z } from 'zod';

const userRegisterValidationSchema = z.object({
  body: z.object({
    fullName: z.string({
      required_error: "Full name is required",
      invalid_type_error: "FullName must be a string",
    }).min(3, "Full Name must be at least 3 characters long")
      .max(30, "Full Name  must be at most 30 characters long"),

    email: z.string({
      required_error: "Email is required",
    }).email({
      message: "Invalid email address", // Basic email validation
    // eslint-disable-next-line no-useless-escape
    }).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: "Invalid email format", // Custom regex validation
    }),

    password: z.string({
      required_error: "Password is required!",
    }).min(6, "Password must be at least 6 characters long"), // You can add more constraints as needed

    role: z.enum(['user', 'admin'], {
      required_error: "Role is required",
      invalid_type_error: "Role must be 'user' or 'admin'",
    }),

    isActive: z.boolean({
      invalid_type_error: "IsActive must be a boolean",
    }).optional(),
  })
})

const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  billingAddress: z.string().min(1, 'Billing address is required'),
  shippingAddress: z.string().min(1, 'Shipping address is required'),
});

// Define the schema for TUpdateUser
export const userProfileUpdateValidationSchema = z.object({
  address: addressSchema,
  age: z.number().int().positive('Age must be a positive integer'),
  phone: z.string().min(1, 'Phone number is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
});


export default userRegisterValidationSchema;
