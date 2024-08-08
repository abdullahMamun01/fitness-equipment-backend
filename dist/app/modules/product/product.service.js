"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const product_model_1 = __importDefault(require("./product.model"));
const MAX_PRICE = 1000000;
//adding product into db
const addProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.create(payload);
    return product;
});
//get all product from db
const getAllProductFromDB = ({ page = 1, limit = 10, search = "", min = 0, max = MAX_PRICE, // Arbitrary large number
category = '' }) => __awaiter(void 0, void 0, void 0, function* () {
    if (page < 1)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Page number must be greater than or equal to 1');
    if (limit < 1)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Limit must be greater than or equal to 1');
    if (min < 0)
        min = 0; // Ensure min is non-negative
    if (max < min)
        max = min; // Ensure max is not less than min
    const skip = (page - 1) * limit;
    const lowerCaseQuery = search.toLowerCase();
    // Build the query object
    const query = Object.assign(Object.assign({ price: { $gte: min, $lte: max } }, (search && {
        $or: [
            { name: { $regex: lowerCaseQuery, $options: 'i' } },
            { category: { $regex: lowerCaseQuery, $options: 'i' } }
        ]
    })), (category && { category }));
    const products = yield product_model_1.default.find(query).skip(skip).limit(limit);
    return products;
});
//update product into db
const updateProductIntoDB = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Find and update the product in one atomic operation
    const updatedProduct = yield product_model_1.default.findByIdAndUpdate(productId, payload, { new: true, runValidators: true });
    if (!updatedProduct) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Product with ID '${productId}' not found!`);
    }
    return updatedProduct;
});
//delete product into db
const deleteProductIntoDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield product_model_1.default.findByIdAndDelete(productId);
    if (!updatedProduct) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Product with ID '${productId}' not found!`);
    }
    return updatedProduct;
});
const relatedProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Product with ID '${productId}' not found!`);
    }
    const products = yield product_model_1.default.find({
        _id: { $ne: product._id },
        tags: { $in: product.tags },
        category: product.category,
    });
    return products;
});
exports.productService = {
    addProductIntoDB,
    getAllProductFromDB,
    updateProductIntoDB,
    deleteProductIntoDB,
    relatedProductFromDB,
};
