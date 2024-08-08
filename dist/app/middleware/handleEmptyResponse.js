"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleEmptyResponse = (req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
        if (data.data && (Array.isArray(data.data) && data.data.length === 0)) {
            data.success = false;
            data.message = 'No data found';
            data.statusCode = http_status_1.default.NOT_FOUND;
        }
        return originalJson.call(this, data);
    };
    next();
};
exports.default = handleEmptyResponse;
