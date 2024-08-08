"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const user_constants_1 = require("../user/user.constants");
const authoRization_1 = require("../../middleware/authoRization");
const payment_controller_1 = require("./payment.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const payment_validation_1 = require("./payment.validation");
/*
api/payments/stripe
*/
const router = (0, express_1.Router)();
router.post('/stripe/confirm-payment', (0, validateRequest_1.validateRequest)(payment_validation_1.paymentValidationSchema), (0, authoRization_1.authoRization)(user_constants_1.USER_ROLE.user), payment_controller_1.paymentController.createStripeCheckoutSession);
exports.paymentRoutes = router;
