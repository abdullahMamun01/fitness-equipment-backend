import { ErrorRequestHandler } from "express"
import AppError from "../error/AppError"




export const globalErrorHandler: ErrorRequestHandler = (error, req,res,next) => {
    let statusCode =  500
    let message =  'something wen wrong'
    if(error instanceof AppError){
        statusCode = error?.statusCode 
        message = error?.message 

    }else{
        statusCode = error?.status || 500
        message = error.message || 'something wen wrong'
    }

    
    return res.status(statusCode).json({
        message,
        path:''
    })
}