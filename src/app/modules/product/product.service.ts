import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import ProductModel from './product.model';
import { TProduct, TProductsParams } from './product.interface';
import { FilterQuery } from 'mongoose';

const MAX_PRICE = 1000000;

//adding product into db
const addProductIntoDB = async (payload: TProduct) => {
    const product = await ProductModel.create(payload);
    return product;
};

//get all product from db
const getAllProductFromDB = async (
    {
        page = 1,
        limit = 10,
        search = "",
        min = 0,
        max = MAX_PRICE,  // Arbitrary large number
        category = ''
    }: TProductsParams
) => {
    if (page < 1)
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Page number must be greater than or equal to 1',
        );
    if (limit < 1)
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Limit must be greater than or equal to 1',
        );
    if (min < 0) min = 0; // Ensure min is non-negative
    if (max < min) max = min; // Ensure max is not less than min

    const skip = (page - 1) * limit;
    const lowerCaseQuery = search.toLowerCase();

    // Build the query object
    const query: FilterQuery<TProduct> = {
        price: { $gte: min, $lte: max },
        ...(search && {
            $or: [
                { name: { $regex: lowerCaseQuery, $options: 'i' } },
                { category: { $regex: lowerCaseQuery, $options: 'i' } }
            ]
        }),
        ...(category && { category })
    };


    const products = await ProductModel.find(query).skip(skip).limit(limit);

    return products;
};

const singleProductFormDB = async (productId:string )=> {
    const product = await ProductModel.findById(productId)
    if(!product){
        throw new AppError(httpStatus.NOT_FOUND , 'Product not found')
    }
    return product
}

//update product into db
const updateProductIntoDB = async (
    productId: string,
    payload: Partial<TProduct>,
) => {
    // Find and update the product in one atomic operation
    const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        payload,
        { new: true, runValidators: true },
    );
    if (!updatedProduct) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            `Product with ID '${productId}' not found!`,
        );
    }
    return updatedProduct;
};

//delete product into db
const deleteProductIntoDB = async (productId: string) => {
    const updatedProduct = await ProductModel.findByIdAndDelete(productId);
    if (!updatedProduct) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            `Product with ID '${productId}' not found!`,
        );
    }
    return updatedProduct;
};

const relatedProductFromDB = async (productId: string) => {
    const product = await ProductModel.findById(productId);
    if (!product) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            `Product with ID '${productId}' not found!`,
        );
    }

    const products = await ProductModel.find({
        _id: { $ne: product._id },
        tags: { $in: product.tags },
        category: product.category,
    });
    return products;
};

export const productService = {
    addProductIntoDB,
    singleProductFormDB,
    getAllProductFromDB,
    updateProductIntoDB,
    deleteProductIntoDB,
    relatedProductFromDB,

};
