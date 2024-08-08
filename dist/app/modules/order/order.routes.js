"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = require("express");
const user_constants_1 = require("../user/user.constants");
const order_controller_1 = require("./order.controller");
const authoRization_1 = require("../../middleware/authoRization");
const router = (0, express_1.Router)();
// router.get('/:orderId', )
router.get('/', (0, authoRization_1.authoRization)(user_constants_1.USER_ROLE.admin), order_controller_1.orderController.orderList);
router.get('/', (0, authoRization_1.authoRization)(user_constants_1.USER_ROLE.user), order_controller_1.orderController.userOrderList);
router.get('/stripe-success', (0, authoRization_1.authoRization)(user_constants_1.USER_ROLE.user), order_controller_1.orderController.confirmOrderWithStripe);
exports.orderRoutes = router;
