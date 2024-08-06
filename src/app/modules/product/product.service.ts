
import httpStatus from "http-status";
import AppError from "../../error/AppError";

import ProductModel from "./product.model";
import { TProduct } from "./product.interface";

//adding product into db
const addProductIntoDB = async (payload: TProduct) => {
    const product = await ProductModel.create(payload)
    return product
}

//get all product from db
const getAllProductFromDB = async () => {
    const products = await ProductModel.find({})
    return products
}
//update product into db
const updateProductIntoDB = async (productId: string, payload: Partial<TProduct>) => {
    // Find and update the product in one atomic operation
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, payload, { new: true, runValidators: true });
    if (!updatedProduct) {
        throw new AppError(httpStatus.NOT_FOUND, `Product with ID '${productId}' not found!`);
    }
    return updatedProduct
}


//delete product into db
const deleteProductIntoDB = async (productId: string) => {

    const updatedProduct = await ProductModel.findByIdAndDelete(productId);
    if (!updatedProduct) {
        throw new AppError(httpStatus.NOT_FOUND, `Product with ID '${productId}' not found!`);
    }
    return updatedProduct
}



const relatedProductFromDB  = async (productId:string) => {
    const product = await ProductModel.findById(productId)
    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, `Product with ID '${productId}' not found!`);
    }

    const products  = await ProductModel.find({
        _id: {$ne: product._id} ,
        tags: {$in : product.tags},
        category : product.category
    })
    return products
}


export const productService = {
    addProductIntoDB,
    getAllProductFromDB,
    updateProductIntoDB,
    deleteProductIntoDB,
    relatedProductFromDB
}