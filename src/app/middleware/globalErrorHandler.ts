import { ErrorRequestHandler, NextFunction } from "express"
import AppError from "../error/AppError"
import { ZodError } from "zod"
import { TErrorSources } from "../interface/error.interface"
import { handleZodError } from "../error/handleZodError"

 /*  */


export const globalErrorHandler: ErrorRequestHandler = (err, req,res,next) => {
    let statusCode =  500
    let message =  'something wen wrong'
    let errorSources: TErrorSources = [
        {
          path: '',
          message: 'Something went wrong',
        },
    ]
    
    if(err instanceof AppError){
        statusCode = err?.statusCode 
        message = err?.message 
        errorSources = [{
            path:'',
            message:err?.message
        }]
    }else if (err?.name === 'ValidationError'){
        console.log(err.errors , ' hello')
    }else if (err?.name === 'CastError'){
        console.log('hello')
    }
    else if(err instanceof ZodError){

        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else{
        statusCode = err?.status || 500
        message = err.message || 'something wen wrong'
    }


    return res.status(statusCode).json({
        message,
        statusCode: err.statusCode,
        errorSources
    })
}