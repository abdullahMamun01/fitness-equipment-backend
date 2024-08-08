"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileUpdateValidationSchema = void 0;
const zod_1 = require("zod");
const userRegisterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({
            required_error: "Full name is required",
            invalid_type_error: "FullName must be a string",
        }).min(3, "Full Name must be at least 3 characters long")
            .max(30, "Full Name  must be at most 30 characters long"),
        email: zod_1.z.string({
            required_error: "Email is required",
        }).email({
            message: "Invalid email address", // Basic email validation
            // eslint-disable-next-line no-useless-escape
        }).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
            message: "Invalid email format", // Custom regex validation
        }),
        password: zod_1.z.string({
            required_error: "Password is required!",
        }).min(6, "Password must be at least 6 characters long"), // You can add more constraints as needed
        role: zod_1.z.enum(['user', 'admin'], {
            required_error: "Role is required",
            invalid_type_error: "Role must be 'user' or 'admin'",
        }),
        isActive: zod_1.z.boolean({
            invalid_type_error: "IsActive must be a boolean",
        }).optional(),
    })
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, 'Street is required'),
    billingAddress: zod_1.z.string().min(1, 'Billing address is required'),
    shippingAddress: zod_1.z.string().min(1, 'Shipping address is required'),
});
// Define the schema for TUpdateUser
exports.userProfileUpdateValidationSchema = zod_1.z.object({
    address: addressSchema,
    age: zod_1.z.number().int().positive('Age must be a positive integer'),
    phone: zod_1.z.string().min(1, 'Phone number is required'),
    city: zod_1.z.string().min(1, 'City is required'),
    country: zod_1.z.string().min(1, 'Country is required'),
    zipCode: zod_1.z.string().min(1, 'Zip code is required'),
});
exports.default = userRegisterValidationSchema;
