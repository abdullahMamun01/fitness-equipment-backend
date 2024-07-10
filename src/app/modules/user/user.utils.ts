import config from "../../config"
import UserModel from "./user.model"
import bcrypt from 'bcrypt'

export const findUserByEmail = async (email:string) =>{
    return await UserModel.findOne({email}).select('+password')
} 


export const hashedPassword =async (password:string ) => {
    const hashPass = await bcrypt.hash(password , Number(config.bcrypt_salt_rounds))
    return hashPass
}
