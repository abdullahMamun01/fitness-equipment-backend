"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageRoutes = void 0;
const express_1 = require("express");
const cloudinary_controller_1 = require("./cloudinary.controller");
const router = (0, express_1.Router)();
router.post('/upload', cloudinary_controller_1.cloudinaryController.uploadImage);
exports.uploadImageRoutes = router;
