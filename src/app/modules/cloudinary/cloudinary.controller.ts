import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

import sendResponse from "../../utils/sendResponse";
import cloudinary from "../../config/cloudinary.config";
import fileUpload from "express-fileupload";





const uploadImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = req.files as  fileUpload.FileArray 
        const fileInfos = Object.values(files ) as fileUpload.UploadedFile[]
  
        const fileAsync = fileInfos.map(async file => {
            const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, {
                upload_preset: 'kiq7tq73' ,
                folder: 'fitness-equipment'
            })
            return uploadResponse
        })
      
        const uploadPromise = await Promise.all(fileAsync)
        const data = uploadPromise.map(image => image.public_id)

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'image uploaded successfully',
            data: data
        })
    } catch (error) {
        next(error)
    }



})

export const cloudinaryController = {
    uploadImage
}