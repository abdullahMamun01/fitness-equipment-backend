import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { servicesRoutes } from '../modules/carWashService/carWashService.route';



const router = Router();

const routes = [
  {
    path: '/',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/services',
    route: servicesRoutes,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});
export default router;
