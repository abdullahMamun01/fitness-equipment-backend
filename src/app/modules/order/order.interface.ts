import { Schema } from "mongoose"


export type TAddress = {
    street:string ,
    phone: string ,
    city:string ,
    postalCode :string ,
    country :string
}

type TPayment  = {
    method: string;
    transactionId: string;
    totalAmount: number;
    status: 'Pending' | 'Completed' | 'Failed';
}

export type TOrderProduct = {
    name: string ,
    productId : Schema.Types.ObjectId ,
    quantity:number ,
    totalPrice: number
}

export type TOrder = {
    userId : Schema.Types.ObjectId ,
    products: TOrderProduct[] ,
    totalAmount : number ,
    paymentInfo: TPayment,
    shippingAddress: TAddress,
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled',
    deliveryTime : string,
    orderDate:Date, //delevery time range expected
    deliveryDate?: Date //delivery date
}