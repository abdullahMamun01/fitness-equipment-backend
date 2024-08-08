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
exports.parseBillingDetails = exports.orderItems = void 0;
const stripe_1 = __importDefault(require("../../utils/stripe"));
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const orderItems = (line_items) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(line_items.data.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!((_a = item.price) === null || _a === void 0 ? void 0 : _a.product)) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product information is missing in line item.");
        }
        if (item.quantity === null) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Quantity is null for a line item.");
        }
        const product = yield stripe_1.default.products.retrieve(item.price.product);
        return {
            name: product.name,
            productId: new mongoose_1.Schema.Types.ObjectId(item.price.product), // Assuming you will convert this to MongoDB ObjectId later
            quantity: item.quantity,
            price: item.price.unit_amount / 100, // Convert cents to dollars
        };
    })));
});
exports.orderItems = orderItems;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseBillingDetails = (metadata) => {
    try {
        const billingDetails = JSON.parse(metadata.billingDetails);
        // You can add additional validation logic here if necessary
        if (!billingDetails.street || !billingDetails.phone || !billingDetails.city || !billingDetails.postalCode || !billingDetails.country) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid billing details');
        }
        return billingDetails;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to parse billing details: ');
    }
};
exports.parseBillingDetails = parseBillingDetails;
