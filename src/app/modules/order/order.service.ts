import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TOrder } from "./order.interface";
import OrderModel from "./order.model";
import { Payment } from "../payment/payment.interface";
import mongoose from "mongoose";
import { paymentService } from "../payment/pyment.service";



const saveOrderToDB = async (payload: TOrder) => {
    const existingOrder = await OrderModel.findOne({ userId: payload.userId, 'paymentInfo.transactionId': payload.paymentInfo.transactionId })
    if (existingOrder) {
        throw new AppError(httpStatus.BAD_REQUEST, 'You have already requested to order these products');
    }
    const newOrder = new OrderModel(payload);
    await newOrder.save();
    return newOrder;
}

const processOrderAndPayment = async (paymentPayload: Payment, orderPayload: TOrder) => {
    const session = await mongoose.startSession()
    try {
        await paymentService.savePaymentToDB(paymentPayload)
        await saveOrderToDB(orderPayload)

        await session.commitTransaction()
        await session.endSession()
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
    }

}

export const orderService = {
    processOrderAndPayment
}

