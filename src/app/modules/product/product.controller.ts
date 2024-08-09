import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { productService } from "./product.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
/* 

api/products?page=3&limit=10
*/

// 
const getAllProduct = catchAsync(async (req: Request, res: Response) => {
    const { page, limit, search, category, min, max } = req.query

    const params = {
        page: parseInt(page as string, 10) || undefined,
        limit: parseInt(limit as string, 10) || undefined,
        search: search as string || undefined,
        min: parseFloat(min as string) || undefined,
        max: parseFloat(max as string) || undefined,
        category: category as string || undefined
    };

    const productList = await productService.getAllProductFromDB(params)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: productList
    })
})


const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.productId
    const productList = await productService.singleProductFormDB(productId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
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


//related product request
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
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getRelatedProduct
}