import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"


import config from "../../config"
import { Product } from "./payment.interface"
import httpStatus from "http-status"
import stripe from "../../utils/stripe"


const createStripeCheckoutSession = catchAsync(async (req: Request, res: Response) => {
    const items = req.body.products
    const billingDetails = req.body.billingDetails
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: 'payment',
        submit_type: "auto",
        line_items: items.map((item: Product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.img],
                },
                unit_amount: item.price * 100, // price in cents
            },
            quantity: item.quantity,

        })),

        success_url: `${config.client_public_domain}/order?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.client_public_domain}/order?canceled=true`,
        metadata: {
            billingDetails: JSON.stringify(billingDetails)
        },

    })

    res.send(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        message: "payment success",
        sessionId: session.id,
        session_url: session.success_url
    })

})


export const paymentController = {
    createStripeCheckoutSession
}