"use strict";
/*
body: {
userId,
sessionI

}
/api/order/confirm
*/
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
exports.orderController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const stripe_1 = __importDefault(require("../../utils/stripe"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const order_utils_1 = require("./order.utils");
const order_service_1 = require("./order.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const order_validation_1 = require("./order.validation");
const confirmOrderWithStripe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { session_id } = req.body;
    const userId = req.user.userId;
    const checkoutSession = yield stripe_1.default.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"],
    });
    if (!checkoutSession) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'session id not found or expired');
    }
    const payment_intent = checkoutSession.payment_intent;
    const line_items = checkoutSession.line_items;
    if (!payment_intent || !line_items) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid session_id');
    }
    const payment_intent_id = payment_intent.id;
    const orderList = yield (0, order_utils_1.orderItems)(line_items);
    const paymentInfo = {
        userId,
        transactionId: payment_intent_id,
        paymentIntentId: payment_intent_id,
        paymentMethod: "Credit Card",
        paymentStatus: 'Completed',
        isProcessed: true,
        paymentDate: new Date(Date.now())
    };
    const orderInfo = {
        userId,
        products: orderList,
        totalAmount: payment_intent.amount,
        shippingAddress: (0, order_utils_1.parseBillingDetails)(checkoutSession.metadata),
        status: 'Processing',
        deliveryTime: 'within 5 days',
        orderDate: new Date(Date.now()),
        paymentInfo: {
            method: 'stripe',
            transactionId: payment_intent_id,
            totalAmount: payment_intent.amount,
            status: 'Completed'
        }
    };
    const order = yield order_service_1.orderService.processOrderAndPayment(paymentInfo, orderInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        data: order,
        message: 'order created successfully'
    });
}));
//cod- cash on delivery
const confirmCODOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { orderList, shippingAddress } = req.body;
    const totalAmount = orderList.reduce((acc, order) => Math.floor(order.price * order.quantity) + acc, 0);
    const TXN = (0, order_validation_1.generateManualTxId)(userId);
    const paymentInfo = {
        userId,
        transactionId: TXN,
        paymentIntentId: TXN,
        paymentMethod: "Manual",
        paymentStatus: 'Pending',
        isProcessed: true,
        paymentDate: new Date(Date.now())
    };
    const orderInfo = {
        userId,
        products: orderList,
        totalAmount,
        shippingAddress: shippingAddress,
        status: 'Pending',
        deliveryTime: 'within 5 days',
        orderDate: new Date(Date.now()),
        paymentInfo: {
            method: 'Manual',
            transactionId: TXN,
            totalAmount: totalAmount,
            status: 'Pending'
        }
    };
    const order = yield order_service_1.orderService.processOrderAndPayment(paymentInfo, orderInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'order created successfully',
        data: order
    });
}));
const userOrderList = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderList = yield order_service_1.orderService.getSingleOrderListFromDB(req.user.userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'order Retrieved successfully',
        data: orderList
    });
}));
const orderList = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderList = yield order_service_1.orderService.orderListFormDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'order Retrieved successfully',
        data: orderList
    });
}));
exports.orderController = {
    confirmOrderWithStripe,
    confirmCODOrder,
    userOrderList,
    orderList
};
