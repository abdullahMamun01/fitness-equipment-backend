"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const product_validation_1 = __importDefault(require("./product.validation"));
const authoRization_1 = require("../../middleware/authoRization");
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.get('/', product_controller_1.productController.getAllProduct);
router.get('/:productId/related', product_controller_1.productController.getRelatedProduct);
router.post('/', (0, validateRequest_1.validateRequest)(product_validation_1.default), (0, authoRization_1.authoRization)(user_constants_1.USER_ROLE.admin), product_controller_1.productController.addProduct);
router.patch('/:productId', (0, validateRequest_1.validateRequest)(product_validation_1.default.partial()), (0, authoRization_1.authoRization)(user_constants_1.USER_ROLE.admin), product_controller_1.productController.updateProduct);
router.delete('/:productId', (0, authoRization_1.authoRization)(user_constants_1.USER_ROLE.admin), product_controller_1.productController.deleteProduct);
exports.productRoutes = router;
