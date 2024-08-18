import mongoose from "mongoose"
import { TAddress } from "../order/order.interface"


export type Product = {
    id:string ,
    name :string ,
    img: string ,
    price: number ,
    quantity : number
}


export type PaymentDetails  ={
    products: Product[],
    billingDetails : TAddress
}

export type Payment = {
    userId :mongoose.Schema.Types.ObjectId,
    transactionId: string;
    paymentIntentId:string ,
    paymentMethod: 'Credit Card'   | 'Other' | "Manual";
    paymentStatus: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
    paymentDate: Date;
    isProcessed: boolean;
  };