import { USER_ROLE } from "./user.constants"

export type TUser = {
    name: string ,
    email: string ,
    password:string ,
    phone: string ,
    role: 'user' | 'admin',
    address: string 
}

export type TLogin = {
    email: string,
    password: string
}

export type TUserRole  = keyof typeof USER_ROLE
