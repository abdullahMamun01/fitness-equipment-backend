"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const errorSources = [{
            path: err.path,
            message: err.message
        }];
    const statusCode = 400;
    return {
        errorSources,
        statusCode,
        message: 'Invalid ID',
    };
};
exports.default = handleCastError;
