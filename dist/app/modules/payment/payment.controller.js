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
exports.paymentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const config_1 = __importDefault(require("../../config"));
const http_status_1 = __importDefault(require("http-status"));
const stripe_1 = __importDefault(require("../../utils/stripe"));
const createStripeCheckoutSession = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = req.body.products;
    const billingDetails = req.body.billingDetails;
    const session = yield stripe_1.default.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: 'payment',
        submit_type: "auto",
        line_items: items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.img],
                },
                unit_amount: item.price * 100, // price in cents
            },
            quantity: item.quantity,
        })),
        success_url: `${config_1.default.client_public_domain}/order?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config_1.default.client_public_domain}/order?canceled=true`,
        metadata: {
            billingDetails: JSON.stringify(billingDetails)
        },
    });
    res.send(http_status_1.default.OK).json({
        statusCode: http_status_1.default.OK,
        message: "payment success",
        sessionId: session.id,
        session_url: session.success_url
    });
}));
exports.paymentController = {
    createStripeCheckoutSession
};
