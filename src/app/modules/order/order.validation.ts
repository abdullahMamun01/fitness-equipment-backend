import { z } from "zod";
import { v4 as uuid } from 'uuid';
import { isValidObjectId } from 'mongoose';

export const orderValidationSchema = z.object({
    body: z.object({
        session_id: z.string({required_error:'session_id is required!' , invalid_type_error: "session_id must be string"})
    })
})


const TAddressSchema = z.object({
    street: z.string().min(1, 'Street is required'),
    phone: z.string().min(1, 'Phone number is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
  });
  
  // Define the schema for TOrderProduct
  const TOrderProductSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    productId: z.string().refine(value => isValidObjectId(value), {
      message: 'Invalid productId format',
    }), // Use a refinement to validate ObjectId format
    quantity: z.number().int().positive('Quantity must be a positive integer'),
    price: z.number().nonnegative('Total price must be a non-negative number'),
  });
  
  // Define the combined schema
  export const manualPaymentOrderSchema  = z.object({
    shippingAddress: TAddressSchema,
    orderList: z.array(TOrderProductSchema),
  })









export const  generateManualTxId = (userId : string ) => {
    const uniqueId  = uuid()
    return `TXN-${userId}-${uniqueId}`
}