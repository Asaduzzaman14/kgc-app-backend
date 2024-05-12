import express from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { ServicesRoutes } from '../module/services/services.route';
import { ServicesCatagoryRoute } from '../module/servicesCatagory/servicesCatagory.route';
import { UserRoutes } from '../module/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/services',
    routes: ServicesRoutes,
  },
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/auth-register',
    routes: UserRoutes,
  },
  {
    path: '/services-catagory',
    routes: ServicesCatagoryRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
