import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { productService } from "./product.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";



const getAllProduct = catchAsync(async (req: Request, res: Response) => {
    const productList = await productService.getAllProductFromDB()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: productList
    })
})


const addProduct = catchAsync(async (req: Request, res: Response) => {
    const productList = await productService.addProductIntoDB(req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        data: productList
    })
})

const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params
    const productList = await productService.updateProductIntoDB(productId, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: productList
    })
})

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params
    const productList = await productService.deleteProductIntoDB(productId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: productList
    })
})

const getRelatedProduct = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.productId
    const productList = await productService.relatedProductFromDB(productId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: productList
    })
})


export const productController = {
    getAllProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getRelatedProduct
}