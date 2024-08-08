"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateManualTxId = exports.manualPaymentOrderSchema = exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
const uuid_1 = require("uuid");
const mongoose_1 = require("mongoose");
exports.orderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        session_id: zod_1.z.string({ required_error: 'session_id is required!', invalid_type_error: "session_id must be string" })
    })
});
const TAddressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, 'Street is required'),
    phone: zod_1.z.string().min(1, 'Phone number is required'),
    city: zod_1.z.string().min(1, 'City is required'),
    postalCode: zod_1.z.string().min(1, 'Postal code is required'),
    country: zod_1.z.string().min(1, 'Country is required'),
});
// Define the schema for TOrderProduct
const TOrderProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    productId: zod_1.z.string().refine(value => (0, mongoose_1.isValidObjectId)(value), {
        message: 'Invalid productId format',
    }), // Use a refinement to validate ObjectId format
    quantity: zod_1.z.number().int().positive('Quantity must be a positive integer'),
    price: zod_1.z.number().nonnegative('Total price must be a non-negative number'),
});
// Define the combined schema
exports.manualPaymentOrderSchema = zod_1.z.object({
    shippingAddress: TAddressSchema,
    orderList: zod_1.z.array(TOrderProductSchema),
});
const generateManualTxId = (userId) => {
    const uniqueId = (0, uuid_1.v4)();
    return `TXN-${userId}-${uniqueId}`;
};
exports.generateManualTxId = generateManualTxId;
