"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const auth_validation_1 = require("./auth.validation");
const user_controller_1 = require("../user/user.controller");
const user_validation_1 = __importDefault(require("../user/user.validation"));
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.validateRequest)(auth_validation_1.loginValidationSchema), auth_controller_1.authController.login);
router.post('/signup', (0, validateRequest_1.validateRequest)(user_validation_1.default), user_controller_1.userController.signupController);
exports.authRoutes = router;
