import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import { findUserByEmail } from "./user.utils";





const createUser  = async (payload : TUser) => {
    const isUserExist = await findUserByEmail(payload.email)
    if(isUserExist){
        throw new AppError(httpStatus.FOUND , `this email : ${payload.email} is already registered!`)
    }
    const newUser = await UserModel.create(payload)
    return newUser
}



export const userService  = {
    createUser
}