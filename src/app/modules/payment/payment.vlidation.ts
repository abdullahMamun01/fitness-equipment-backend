import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    img: z.string().url('Invalid URL'),
    price: z.number().min(0, 'Price must be a non-negative number'),
    quantity: z.number().int().nonnegative('Quantity must be a non-negative integer'),
});

const addressSchema = z.object({
    street: z.string().min(1, "Street is required"),
    phone: z.string().min(1, "Phone number is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
})

export const paymentValidationSchema = z.object({
    body: z.object({
        products: z.array(productSchema).min(1, 'At least one product is required'),
        billingDetails: addressSchema
    })
})