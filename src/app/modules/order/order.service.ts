import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TOrder, TOrderProduct } from "./order.interface";
import OrderModel from "./order.model";
import { Payment } from "../payment/payment.interface";
import mongoose from "mongoose";
import { paymentService } from "../payment/pyment.service";
import ProductModel from "../product/product.model";

const updateProductQuantity = async (orderList: TOrderProduct[]) => {

    const update = orderList.map(order => ({
        updateOne: {
            filter: { _id: order.productId },
            update: { $inc: { stock: -order.quantity } },
            upsert: false
        }
    }))

    const updateProduct = await ProductModel.bulkWrite(update)
    return updateProduct

}


const saveOrderToDB = async (payload: TOrder) => {
    const existingOrder = await OrderModel.findOne({ userId: payload.userId, 'paymentInfo.transactionId': payload.paymentInfo.transactionId })
    if (existingOrder) {
        throw new AppError(httpStatus.BAD_REQUEST, 'You have already requested to order these products');
    }
    const newOrder = new OrderModel(payload);

    await newOrder.save();
    return newOrder;
}


// const bulkProductQuantityUpdate =  (productList :TOrderProduct[] )


const processOrderAndPayment = async (paymentPayload: Payment, orderPayload: TOrder) => {
    const session = await mongoose.startSession()
    try {
        await paymentService.saveStipePaymentToDB(paymentPayload)
        await updateProductQuantity(orderPayload.products)
        await saveOrderToDB(orderPayload)
        await session.commitTransaction()
        await session.endSession()
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
    }

}

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