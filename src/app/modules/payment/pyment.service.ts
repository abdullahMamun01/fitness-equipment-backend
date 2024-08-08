import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Payment } from "./payment.interface";
import PaymentModel from "./payment.model";

const saveStipePaymentToDB  = async (payload:Payment) => {
    const existingPayment = await PaymentModel.findOne({paymentIntentId:payload.paymentIntentId})
    if(existingPayment?.isProcessed){
        throw new AppError(httpStatus.BAD_REQUEST , 'Payment already processed')
    }
    const paymentInfo = new PaymentModel(payload) 
    await paymentInfo.save()
    return paymentInfo
}



export const paymentService = {
    saveStipePaymentToDB
}