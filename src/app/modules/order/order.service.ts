import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TOrder, TOrderProduct } from "./order.interface";
import OrderModel from "./order.model";
import { Payment } from "../payment/payment.interface";
import mongoose from "mongoose";
import { paymentService } from "../payment/pyment.service";
import ProductModel from "../product/product.model";
import { ClientSession } from "mongoose";

const updateProductQuantity = async (orderList: TOrderProduct[], session: ClientSession) => {

    const update = orderList.map(order => ({
        updateOne: {
            filter: { _id: order.productId },
            update: { $inc: { stock: -order.quantity } },
            upsert: false
        }
    }))

    const updateProduct = await ProductModel.bulkWrite(update, { session })
    return updateProduct
}


const saveOrderToDB = async (payload: TOrder, session: ClientSession) => {
    
    const existingOrder = await OrderModel.findOne({ userId: payload.userId, 'paymentInfo.transactionId': payload.paymentInfo.transactionId })
    if (existingOrder) {
        
        throw new AppError(httpStatus.BAD_REQUEST, 'You have already requested to order this products');
    }
    const newOrder = await OrderModel.create([payload], { session });

    return newOrder;
}

const processOrderAndPayment = async (paymentPayload: Payment, orderPayload: TOrder) => {
    const session = await mongoose.startSession();
    session.startTransaction(); // Start the transaction

    try {
        await saveOrderToDB(orderPayload, session);
        await paymentService.saveStipePaymentToDB(paymentPayload, session);
        await updateProductQuantity(orderPayload.products, session); // Ensure session is passed

        await session.commitTransaction(); // Commit the transaction
    } catch (error) {
        await session.abortTransaction(); // Abort the transaction on error
        const err = error as Error
        throw new AppError(httpStatus.FORBIDDEN,  err.message);
    } finally {
        session.endSession(); // End the session
    }
};


const getSingleOrderListFromDB = async (userId: string) => {
    const orderList = await OrderModel.find({ _id: userId })
    return orderList
}


const orderListFormDB = async () => {
    const orderList = await OrderModel.find()
    return orderList
}

export const orderService = {
    processOrderAndPayment,
    getSingleOrderListFromDB,
    orderListFormDB
}



/* 
[] // there will have one to more . so it should be array so we need looping thorwo the all products and update 

*/