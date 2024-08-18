import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Payment } from "./payment.interface";
import PaymentModel from "./payment.model";
import { ClientSession } from "mongoose";

const saveStipePaymentToDB  = async (payload:Payment,session:ClientSession) => {
    
    const existingPayment = await PaymentModel.findOne({paymentIntentId:payload.paymentIntentId})
    if(existingPayment?.paymentStatus){
        throw new AppError(httpStatus.BAD_REQUEST , 'Payment already processed')
    }

    const paymentInfo = await PaymentModel.create([payload] , {session}) 

    return paymentInfo
}



export const paymentService = {
    saveStipePaymentToDB
}