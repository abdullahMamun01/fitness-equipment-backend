import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { servicesRoutes } from '../modules/carWashService/carWashService.route';
import { slotRoutes } from '../modules/slot/slot.route';



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
  {
    path: '/slots',
    route: slotRoutes,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});
export default router;
