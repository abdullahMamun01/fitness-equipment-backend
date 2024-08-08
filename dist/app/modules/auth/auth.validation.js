"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = void 0;
const zod_1 = require("zod");
exports.loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'email or username is required' }).email({ message: 'invalid email type' }),
        password: zod_1.z.string({ required_error: 'Password is required!' })
    })
});
