"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const product_routes_1 = require("../modules/product/product.routes");
const cloudinary_route_1 = require("../modules/cloudinary/cloudinary.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/me',
        route: user_route_1.userRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/products',
        route: product_routes_1.productRoutes,
    },
    {
        path: '/image',
        route: cloudinary_route_1.uploadImageRoutes,
    }
];
routes.forEach(({ path, route }) => {
    router.use(path, route);
});
exports.default = router;
