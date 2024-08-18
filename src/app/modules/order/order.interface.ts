import {  Types } from "mongoose"


export type TAddress = {
    firstName:string ,
    lastName:string,
    street:string ,
    phone: string ,
    city:string ,
    postalCode :string ,
    country :string
}

export type TPayment  = {
    method: string;
    transactionId: string;
    totalAmount: number;
    status: 'Pending' | 'Completed' | 'Failed';
}

export type TOrderProduct = {
    productId : Types.ObjectId ,
    quantity:number ,
    price: number
}

export type TOrder = {
    userId :Types.ObjectId,
    products: TOrderProduct[] ,
    totalAmount : number ,
    paymentInfo: TPayment,
    shippingAddress: TAddress,
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled',
    deliveryTime : string,
    orderDate:Date, //delevery time range expected
    deliveryDate?: Date //delivery date
}