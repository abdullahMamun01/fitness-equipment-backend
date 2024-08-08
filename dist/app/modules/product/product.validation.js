"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRelatedProductSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    description: zod_1.z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
    }),
    price: zod_1.z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    }),
    category: zod_1.z.string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
    }),
    brand: zod_1.z.string({
        required_error: "Brand is required",
        invalid_type_error: "Brand must be a string",
    }),
    img: zod_1.z.string({
        required_error: "Image URL is required",
        invalid_type_error: "Image URL must be a string",
    }),
    images: zod_1.z.array(zod_1.z.string({
        required_error: "Each image URL must be a string",
        invalid_type_error: "Images must be an array of strings",
    }), {
        required_error: "Images are required",
        invalid_type_error: "Images must be an array of strings",
    }),
    stock: zod_1.z.number({
        required_error: "Stock is required",
        invalid_type_error: "Stock must be a number",
    }),
    sku: zod_1.z.string({
        required_error: "SKU is required",
        invalid_type_error: "SKU must be a string",
    }),
    tags: zod_1.z.array(zod_1.z.string({
        required_error: "Each tag must be a string",
        invalid_type_error: "Tags must be an array of strings",
    }), {
        required_error: "Tags are required",
        invalid_type_error: "Tags must be an array of strings",
    }),
    discountedPrice: zod_1.z.number({
        required_error: "Discounted Price is required",
        invalid_type_error: "Discounted Price must be a number",
    }),
    stockStatus: zod_1.z.enum(['inStock', 'outOfStock', 'preOrder', 'discontinued'], {
        required_error: "Stock Status is required",
        invalid_type_error: "Stock Status must be one of 'inStock', 'outOfStock', 'preOrder', 'discontinued'",
    }),
    weight: zod_1.z.number({
        invalid_type_error: "Weight must be a number",
    }).optional(),
    dimensions: zod_1.z.object({
        length: zod_1.z.number({
            required_error: "Length is required",
            invalid_type_error: "Length must be a number",
        }),
        width: zod_1.z.number({
            required_error: "Width is required",
            invalid_type_error: "Width must be a number",
        }),
        height: zod_1.z.number({
            required_error: "Height is required",
            invalid_type_error: "Height must be a number",
        })
    }).optional(),
    material: zod_1.z.string({
        invalid_type_error: "Material must be a string",
    }).optional(),
    color: zod_1.z.string({
        invalid_type_error: "Color must be a string",
    }).optional(),
    manufacturer: zod_1.z.string({
        invalid_type_error: "Manufacturer must be a string",
        required_error: "manufacturer is required"
    }).optional(),
    releaseDate: zod_1.z.date({
        invalid_type_error: "Release Date must be a valid date",
    }).optional()
});
exports.TRelatedProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().refine(value => mongoose_1.default.Types.ObjectId.isValid(value), {
            message: 'Invalid productId format',
        }), // Validate ObjectId format
        tags: zod_1.z.array(zod_1.z.string()).min(1, 'At least one tag is required'), // Ensure tags is a non-empty array of strings
        category: zod_1.z.string().min(1, 'Category is required'), // Ensure category is a non-empty string
    })
});
exports.default = ProductValidationSchema;
