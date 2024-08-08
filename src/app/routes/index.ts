import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { productRoutes } from '../modules/product/product.routes';
import { uploadImageRoutes } from '../modules/cloudinary/cloudinary.route';


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
    path: '/image',
    route: uploadImageRoutes,
  }

  
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});
export default router;
