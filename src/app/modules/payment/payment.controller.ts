import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import config from "../../config";
import { Product } from "./payment.interface";
import httpStatus from "http-status";
import stripe from "../../utils/stripe";


const createStripeCheckoutSession = catchAsync(async (req: Request, res: Response) => {

    const items:Product[] = req.body.products;

    const billingDetails = req.body.billingDetails;

    // Validate and prepare line items
    const lineItems = items.map((item: Product) => {
        const priceInCents = Math.round(item.price * 100); // Ensure price is an integer
        const quantity = Math.max(item.quantity, 1);

        if (priceInCents <= 0) {
            throw new Error(`Invalid price value for product ${item.name}`);
        }
        if (quantity <= 0) {
            throw new Error(`Invalid quantity value for product ${item.name}`);
        }

        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.img]
                    // id: item.id
                },
                unit_amount: priceInCents, // Use rounded integer value
            },
            quantity: quantity,
        };
    });

    const stripeMetadata = JSON.stringify({
        productIds: items.map(pd => pd.id),
        billingDetails,
    });


    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: 'payment',
        submit_type: "auto",
        line_items: lineItems,
        success_url: `${config.client_public_domain}/payment-success?payment_status=succeeded&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.client_public_domain}/payment-failed?payment_status=false`,
        metadata: {
            details: stripeMetadata
        },
    });

    // Send the response with the session details
    res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        message: "Stripe payment session created successfully",
        data: {
            sessionId: session.id,
            sessionUrl: session.url, // Use session.url instead of session.success_url
        },
    });

});

export const paymentController = {
    createStripeCheckoutSession,
};
