import mongoose from 'mongoose';
import { z } from 'zod';

const ProductValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        description: z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
        }),
        price: z.number({
            required_error: "Price is required",
            invalid_type_error: "Price must be a number",
        }),
        category: z.string({
            required_error: "Category is required",
            invalid_type_error: "Category must be a string",
        }),
        brand: z.string({
            required_error: "Brand is required",
            invalid_type_error: "Brand must be a string",
        }),
        img: z.string({
            required_error: "Image URL is required",
            invalid_type_error: "Image URL must be a string",
        }),
        images: z.array(z.string({
            required_error: "Each image URL must be a string",
            invalid_type_error: "Images must be an array of strings",
        }), {
            required_error: "Images are required",
            invalid_type_error: "Images must be an array of strings",
        }),
        stock: z.number({
            required_error: "Stock is required",
            invalid_type_error: "Stock must be a number",
        }),
        sku: z.string({
            required_error: "SKU is required",
            invalid_type_error: "SKU must be a string",
        }),
        tags: z.array(z.string({
            required_error: "Each tag must be a string",
            invalid_type_error: "Tags must be an array of strings",
        }), {
            required_error: "Tags are required",
            invalid_type_error: "Tags must be an array of strings",
        }),
        discountedPrice: z.number({
            required_error: "Discounted Price is required",
            invalid_type_error: "Discounted Price must be a number",
        }),
        stockStatus: z.enum(['inStock', 'outOfStock', 'preOrder', 'discontinued'], {
            required_error: "Stock Status is required",
            invalid_type_error: "Stock Status must be one of 'inStock', 'outOfStock', 'preOrder', 'discontinued'",
        }),
        weight: z.number({
            invalid_type_error: "Weight must be a number",
        }).optional(),
        dimensions: z.object({
            length: z.number({
                required_error: "Length is required",
                invalid_type_error: "Length must be a number",
            }),
            width: z.number({
                required_error: "Width is required",
                invalid_type_error: "Width must be a number",
            }),
            height: z.number({
                required_error: "Height is required",
                invalid_type_error: "Height must be a number",
            })
        }).optional(),
        material: z.string({
            invalid_type_error: "Material must be a string",
        }).optional(),
        color: z.string({
            invalid_type_error: "Color must be a string",
        }).optional(),
        manufacturer: z.string({
            invalid_type_error: "Manufacturer must be a string",
            required_error: "manufacturer is required"
        }).optional(),
        releaseDate: z.date({
            invalid_type_error: "Release Date must be a valid date",
        }).optional()
    })
})

export const TRelatedProductSchema = z.object({
    body: z.object({
        productId: z.string().refine(value => mongoose.Types.ObjectId.isValid(value), {
            message: 'Invalid productId format',
        }), // Validate ObjectId format
        tags: z.array(z.string()).min(1, 'At least one tag is required'), // Ensure tags is a non-empty array of strings
        category: z.string().min(1, 'Category is required'), // Ensure category is a non-empty string
    })
})




export default ProductValidationSchema