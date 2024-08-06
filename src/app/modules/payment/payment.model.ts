
import mongoose, { Schema } from "mongoose";
import  { Payment } from "./payment.interface";


const PaymentSchema = new Schema<Payment>({
    userId : {ref:"User" , type: Schema.ObjectId ,required:true} ,
    transactionId: { type: String, required: true, unique: true },
    paymentMethod: { type: String, enum: ['Credit Card', 'Other'], required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending', required: true },
    paymentDate: { type: Date, required: true },
    isProcessed: { type: Boolean, default: false },
    paymentIntentId: {type:String ,required:true ,unique: true}
  });


  const PaymentModel = mongoose.model<Payment>("Payment" , PaymentSchema)
  export default PaymentModel