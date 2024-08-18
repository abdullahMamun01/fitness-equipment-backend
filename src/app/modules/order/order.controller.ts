import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import stripe from "../../utils/stripe";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import Stripe from "stripe";
import {   parseStripeMetaData, stripeOrders } from "./order.utils";
import { Payment } from "../payment/payment.interface";
import { orderService } from "./order.service";
import sendResponse from "../../utils/sendResponse";
import { TOrder, TOrderProduct } from "./order.interface";
import { generateManualTxId } from "./order.validation";



const confirmOrderWithStripe = catchAsync(async (req: Request, res: Response) => {
    const {  session_id } = req.body
    const userId = req.user.userId
    const checkoutSession = await stripe.checkout.sessions.retrieve(
        session_id,
        {
            expand: ["line_items", "payment_intent"],
        }
    );
    if (!checkoutSession) {
        throw new AppError(httpStatus.BAD_REQUEST, 'session id not found or expired')
    }
   
    const payment_intent = checkoutSession.payment_intent as Stripe.PaymentIntent
    const line_items = checkoutSession.line_items

    if (!payment_intent || !line_items) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid session_id')
    }
    const payment_intent_id = payment_intent.id
    const parseMetadata = parseStripeMetaData(checkoutSession.metadata)
    const orderItems = stripeOrders(line_items , parseMetadata.productIds) 
    const billingDetails = parseMetadata.billingDetails


    const paymentInfo: Payment = {
        userId,
        transactionId: payment_intent_id,
        paymentIntentId: payment_intent_id,
        paymentMethod: "Credit Card",
        paymentStatus: 'Completed',
        isProcessed: true,
        paymentDate: new Date(Date.now())
    }


    const orderInfo: TOrder = {
        userId,
        products: orderItems,
        totalAmount: payment_intent.amount / 100,
        shippingAddress: billingDetails,
        status: 'Processing',
        deliveryTime: 'within 5 days',
        orderDate: new Date(Date.now()),
        paymentInfo: {
            method: 'stripe',
            transactionId: payment_intent_id,
            totalAmount: payment_intent.amount / 100,
            status: 'Completed'
        }
    }

    
    await orderService.processOrderAndPayment(paymentInfo , orderInfo)
    
    sendResponse(res , {
        success:true ,
        statusCode: httpStatus.OK ,
        data:{
            order:orderInfo,
            payment:paymentInfo
        },
        message:'order created successfully'
    })


})


//cod- cash on delivery
const confirmCODOrder = catchAsync(async (req: Request, res: Response) => {

    const userId = req.user.userId
    const {orderList,shippingAddress} = req.body
    const totalAmount = orderList.reduce((acc:number, order : TOrderProduct) =>Math.floor( order.price * order.quantity) + acc , 0 )
    
    const TXN  = generateManualTxId(userId)
    
    const paymentInfo: Payment = {
        userId,
        transactionId: TXN,
        paymentIntentId: TXN,
        paymentMethod: "Manual",
        paymentStatus: 'Pending',
        isProcessed: true,
        paymentDate: new Date(Date.now())
    }

    const orderInfo: TOrder = {
        userId,
        products: orderList,
        totalAmount,
        shippingAddress: shippingAddress,
        status: 'Pending',
        deliveryTime: 'within 5 days',
        orderDate: new Date(Date.now()),
        paymentInfo: {
            method: 'Manual',
            transactionId: TXN,
            totalAmount: totalAmount,
            status: 'Pending'
        }
    }


    const order = await orderService.processOrderAndPayment(paymentInfo , orderInfo)

    sendResponse(res , {
        success:true ,
        statusCode: httpStatus.OK ,
        message:'order created successfully',
        data:order
    })


})

const userOrderList = catchAsync(async (req: Request, res: Response) => {
    const orderList = await orderService.getSingleOrderListFromDB(req.user.userId)
    sendResponse(res , {
        success:true ,
        statusCode: httpStatus.OK ,
        message:'order Retrieved successfully',
        data:orderList
    })
})

const orderList = catchAsync(async (req: Request, res: Response)=> {
    const orderList = await orderService.orderListFormDB()

    sendResponse(res , {
        success:true ,
        statusCode: httpStatus.OK ,
        message:'order Retrieved successfully',
        data:orderList
    }) 
} )


export const orderController = {
    confirmOrderWithStripe,
    confirmCODOrder,
    userOrderList,
    orderList
}