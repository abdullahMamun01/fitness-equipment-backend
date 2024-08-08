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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_utils_1 = require("../user/user.utils");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_utils_1.findUserByEmail)(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, `this email : ${payload.email} is not registered!`);
    }
    // console.log(user , ' user')
    const isValidUser = yield (0, auth_utils_1.compareValidPass)(payload.password, user.password);
    if (!isValidUser) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'the password do not match');
    }
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        name: user.fullName,
        role: user.role,
    };
    //access token generate
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.accessTokenSecret, config_1.default.access_token_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.refreshTokenSecret, config_1.default.refresh_token_expires_in);
    // eslint-disable-next-line no-unused-vars
    const _a = user.toObject(), { password } = _a, remainingField = __rest(_a, ["password"]);
    return {
        user: remainingField,
        token: accessToken,
        refreshToken
    };
});
exports.authService = {
    loginUser,
};
