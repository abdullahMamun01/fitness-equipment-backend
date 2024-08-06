import { USER_ROLE } from "./user.constants"

export type TUser = {
    fullName:string ,
    email: string ,
    password:string ,
    role: 'user' | 'admin',

}

type TAddress = {
    street:string ,
    billingAddress:string,
    shippingAddress:string
}
export type TUpdateUser = {
    address :TAddress ,
    age:number ,
    phone: string ,
    city:string ,
    country:string,
    zipCode:string
}

export type TLogin = {
    email: string,
    password: string
}

export type TUserRole  = keyof typeof USER_ROLE
