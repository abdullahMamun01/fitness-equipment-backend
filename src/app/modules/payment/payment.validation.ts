import { z } from "zod";

const productSchema = z.object({
    id: z.string().min(1, 'Id is required') ,
    name: z.string().min(1, 'Name is required'),
    img: z.string().url('Invalid URL'),
    price: z.number().min(0, 'Price must be a non-negative number'),
    quantity: z.number().int().nonnegative('Quantity must be a non-negative integer'),
});

const addressSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
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