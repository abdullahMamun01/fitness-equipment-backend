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
exports.orderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const order_model_1 = __importDefault(require("./order.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const pyment_service_1 = require("../payment/pyment.service");
const product_model_1 = __importDefault(require("../product/product.model"));
const updateProductQuantity = (orderList) => __awaiter(void 0, void 0, void 0, function* () {
    const update = orderList.map(order => ({
        updateOne: {
            filter: { _id: order.productId },
            update: { $inc: { stock: -order.quantity } },
            upsert: false
        }
    }));
    const updateProduct = yield product_model_1.default.bulkWrite(update);
    return updateProduct;
});
const saveOrderToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingOrder = yield order_model_1.default.findOne({ userId: payload.userId, 'paymentInfo.transactionId': payload.paymentInfo.transactionId });
    if (existingOrder) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You have already requested to order these products');
    }
    const newOrder = new order_model_1.default(payload);
    yield newOrder.save();
    return newOrder;
});
// const bulkProductQuantityUpdate =  (productList :TOrderProduct[] )
const processOrderAndPayment = (paymentPayload, orderPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        yield pyment_service_1.paymentService.saveStipePaymentToDB(paymentPayload);
        yield updateProductQuantity(orderPayload.products);
        yield saveOrderToDB(orderPayload);
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
    }
});
const getSingleOrderListFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderList = yield order_model_1.default.find({ _id: userId });
    return orderList;
});
const orderListFormDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const orderList = yield order_model_1.default.find();
    return orderList;
});
exports.orderService = {
    processOrderAndPayment,
    getSingleOrderListFromDB,
    orderListFormDB
};
/*
[] // there will have one to more . so it should be array so we need looping thorwo the all products and update

*/ 
