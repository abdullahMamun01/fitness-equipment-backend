import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { productRoutes } from '../modules/product/product.routes';
import { uploadImageRoutes } from '../modules/cloudinary/cloudinary.route';
import { paymentRoutes } from '../modules/payment/payment.route';
import { orderRoutes } from '../modules/order/order.routes';


const router = Router();

const routes = [
  {
    path: '/me',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
  {
    path: '/image',
    route: uploadImageRoutes,
  }

  
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});
export default router;
