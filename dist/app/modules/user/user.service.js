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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = __importDefault(require("./user.model"));
const user_utils_1 = require("./user.utils");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield (0, user_utils_1.findUserByEmail)(payload.email);
    if (isUserExist) {
        throw new AppError_1.default(http_status_1.default.FOUND, `this email : ${payload.email} is already registered!`);
    }
    const newUser = yield user_model_1.default.create(payload);
    return newUser;
});
const updateUser = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUser = yield user_model_1.default.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    if (!updateUser) {
        throw new AppError_1.default(http_status_1.default.FOUND, `This user not found!`);
    }
    return updateUser;
});
exports.userService = {
    createUser,
    updateUser
};
