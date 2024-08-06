import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUpdateUser, TUser } from "./user.interface";
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


const updateUser  = async (payload : Partial<TUpdateUser> , userId:string) => {
    const updateUser = await UserModel.findByIdAndUpdate(userId , payload , {new:true ,runValidators:true})
    if(!updateUser){
        throw new AppError(httpStatus.FOUND , `This user not found!`)
    }
    return updateUser
}

export const userService  = {
    createUser,
    updateUser
}