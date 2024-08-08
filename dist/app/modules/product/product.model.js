"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    img: { type: String, required: true },
    images: { type: [String], required: true },
    stock: { type: Number, required: true },
    sku: { type: String, required: true },
    tags: { type: [String], required: true },
    discountedPrice: { type: Number, required: true },
    stockStatus: { type: String, enum: ['inStock', 'outOfStock', 'preOrder', 'discontinued'], required: true },
    weight: { type: Number },
    dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number }
    },
    material: { type: String },
    color: { type: String },
    manufacturer: { type: String },
    releaseDate: { type: Date }
}, {
    timestamps: true
});
const ProductModel = mongoose_1.default.model('Product', ProductSchema);
exports.default = ProductModel;
