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
exports.cloudinaryController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const cloudinary_config_1 = __importDefault(require("../../config/cloudinary.config"));
const uploadImage = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const fileInfos = Object.values(files);
        const fileAsync = fileInfos.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const uploadResponse = yield cloudinary_config_1.default.uploader.upload(file.tempFilePath, {
                upload_preset: 'kiq7tq73',
                folder: 'fitness-equipment'
            });
            return uploadResponse;
        }));
        const uploadPromise = yield Promise.all(fileAsync);
        const data = uploadPromise.map(image => image.public_id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'image uploaded successfully',
            data: data
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.cloudinaryController = {
    uploadImage
};
