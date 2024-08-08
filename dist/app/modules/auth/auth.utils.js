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
exports.isEmail = exports.verifyToken = exports.compareValidPass = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_utils_1 = require("../user/user.utils");
const createToken = (JwtPayload, secretKey, expiresIn) => {
    return jsonwebtoken_1.default.sign(JwtPayload, secretKey, { expiresIn });
};
exports.createToken = createToken;
const compareValidPass = (userPass, hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidPass = yield bcrypt_1.default.compare(userPass, hashedPass);
    return isValidPass;
});
exports.compareValidPass = compareValidPass;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.accessTokenSecret);
        if (!decoded) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized user');
        }
        const user = yield (0, user_utils_1.findUserByEmail)(decoded === null || decoded === void 0 ? void 0 : decoded.email);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
        }
        if (user.role != decoded.role || user.email != decoded.email) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized user');
        }
        return decoded;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'JWT token has expired. Please log in again.');
    }
});
exports.verifyToken = verifyToken;
const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};
exports.isEmail = isEmail;
