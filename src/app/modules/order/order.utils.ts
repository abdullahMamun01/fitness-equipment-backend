

// export const stripeTxId = (chargeId: string ) => {
//     const charge = 
// }

import Stripe from "stripe"
import stripe from "../../utils/stripe"

import { TAddress, TOrderProduct } from "./order.interface";
import { Schema } from "mongoose";

export const orderItems = async (line_items: Stripe.ApiList<Stripe.LineItem>): Promise<TOrderProduct[]> => {
    return await Promise.all(line_items.data.map(async (item) => {
        if (!item.price?.product) {
            throw new Error("Product information is missing in line item.");
        }

        if (item.quantity === null) {
            throw new Error("Quantity is null for a line item.");
        }
        const product = await stripe.products.retrieve(item.price.product as string);
        return {
            name: product.name,
            productId: new Schema.Types.ObjectId(item.price.product as string), // Assuming you will convert this to MongoDB ObjectId later
            quantity: item.quantity,
            totalPrice: (item.price.unit_amount as number) / 100, // Convert cents to dollars
        };
    }));
};


export const parseBillingDetails = (metadata: any): TAddress => {
    try {
        const billingDetails: TAddress = JSON.parse(metadata.billingDetails);
        
        // You can add additional validation logic here if necessary
        if (!billingDetails.street || !billingDetails.phone || !billingDetails.city || !billingDetails.postalCode || !billingDetails.country) {
            throw new Error('Invalid billing details');
        }

        return billingDetails;
    } catch (error) {
        throw new Error('Failed to parse billing details: ' + error.message);
    }
};
