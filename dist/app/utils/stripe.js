"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../config"));
const initializeStripe = () => {
    return new stripe_1.default(config_1.default.stipe_secret_key, {
        apiVersion: '2024-06-20',
        appInfo: { name: 'MuscleMax' }
    });
};
const stripe = initializeStripe();
exports.default = stripe;
