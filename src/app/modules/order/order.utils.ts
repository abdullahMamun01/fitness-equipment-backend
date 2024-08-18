import Stripe from "stripe"
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { TAddress } from "./order.interface";
import { Types } from "mongoose";



export const stripeOrders = (line_items: Stripe.ApiList<Stripe.LineItem>, productIds: string[]) => {
    const orderItems = line_items.data.map((item) => {
        if (!item.price?.product) {
            throw new AppError(httpStatus.BAD_REQUEST, "Product information is missing in line item.");
        }
        if (item.quantity === null) {
            throw new AppError(httpStatus.BAD_REQUEST, "Quantity is null for a line item.");
        }
        return {
            quantity: item.quantity,
            price: (item.price.unit_amount as number) / 100, // Convert cents to dollars
        };
    })
    
    return orderItems.map((item, i) => ({ ...item, productId: new Types.ObjectId(productIds[i] ) }))
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseStripeMetaData = (metadata: any) => {
    try {
        const metaInfo = JSON.parse(metadata.details);

        const billingDetails = metaInfo.billingDetails as TAddress
        // // You can add additional validation logic here if necessary
        if (!billingDetails.street || !billingDetails.phone || !billingDetails.city || !billingDetails.postalCode || !billingDetails.country) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Invalid billing details');
        }

        return { billingDetails, productIds: metaInfo.productIds };
    } catch (error) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to parse billing details: ');
    }
};
