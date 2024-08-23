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
    const { page, limit, search, category, min, max, order } = req.query;

    const categoryArray = typeof category === 'string' ? category.split('|') : [];
    const sortingPrice = typeof order === 'string' && (req.query.order === 'asc' || req.query.order === 'desc')
  ? req.query.order
  : 'asc';
  
    const params = {
        page: parseInt(page as string, 10) || undefined,
        limit: parseInt(limit as string, 10) || undefined,
        search: search as string || undefined,
        min: parseFloat(min as string) || undefined,
        max: parseFloat(max as string) || undefined,
        category: categoryArray.length > 0 ? categoryArray : undefined,
        order:sortingPrice, // Handle order parameter
    };

    const productList = await productService.getAllProductFromDB(params);
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: productList,
    });
});


const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.productId
    const productList = await productService.singleProductFormDB(productId)
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


const getProductCategoriesList = catchAsync(async (req: Request, res: Response) => {

    const categoryList = await productService.getCategoriesListFromDB()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: categoryList
    })
})


export const productController = {
    getAllProduct,
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getRelatedProduct,
    getProductCategoriesList
}