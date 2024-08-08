"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentValidationSchema = void 0;
const zod_1 = require("zod");
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    img: zod_1.z.string().url('Invalid URL'),
    price: zod_1.z.number().min(0, 'Price must be a non-negative number'),
    quantity: zod_1.z.number().int().nonnegative('Quantity must be a non-negative integer'),
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, "Street is required"),
    phone: zod_1.z.string().min(1, "Phone number is required"),
    city: zod_1.z.string().min(1, "City is required"),
    postalCode: zod_1.z.string().min(1, "Postal code is required"),
    country: zod_1.z.string().min(1, "Country is required"),
});
exports.paymentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        products: zod_1.z.array(productSchema).min(1, 'At least one product is required'),
        billingDetails: addressSchema
    })
});
