import Stripe from "stripe"
import stripe from "../../utils/stripe"

import { TAddress, TOrderProduct } from "./order.interface";
import { Schema } from "mongoose";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

export const orderItems = async (line_items: Stripe.ApiList<Stripe.LineItem>): Promise<TOrderProduct[]> => {
    return await Promise.all(line_items.data.map(async (item) => {
        if (!item.price?.product) {
            throw new AppError(httpStatus.BAD_REQUEST, "Product information is missing in line item.");
        }

        if (item.quantity === null) {
            throw new AppError(httpStatus.BAD_REQUEST, "Quantity is null for a line item.");
        }
        const product = await stripe.products.retrieve(item.price.product as string);
        return {
            name: product.name,
            productId: new Schema.Types.ObjectId(item.price.product as string), // Assuming you will convert this to MongoDB ObjectId later
            quantity: item.quantity,
            price: (item.price.unit_amount as number) / 100, // Convert cents to dollars
        };
    }));
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseBillingDetails = (metadata: any): TAddress => {
    try {
        const billingDetails: TAddress = JSON.parse(metadata.billingDetails);

        // You can add additional validation logic here if necessary
        if (!billingDetails.street || !billingDetails.phone || !billingDetails.city || !billingDetails.postalCode || !billingDetails.country) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Invalid billing details');
        }

        return billingDetails;
    } catch (error) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to parse billing details: ');
    }
};
