import express from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { BannerRoutes } from '../module/banner/banner.route';
import { NoticeRoutes } from '../module/notice/notice.route';
import { ProductRoutes } from '../module/product/product.route';
import { ProductCatagoryRoute } from '../module/productCategory/productCategory.route';
import { ScrollTextRoutes } from '../module/scrollText/scrollText.route';
import { ServicesRoutes } from '../module/services/services.route';
import { ServicesCatagoryRoute } from '../module/servicesCatagory/servicesCatagory.route';
import { SubCatagoryRoutes } from '../module/subCategory/subCategory.route';
import { UserRoutes } from '../module/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/banner',
    routes: BannerRoutes,
  },
  {
    path: '/services',
    routes: ServicesRoutes,
  },
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/services-catagory',
    routes: ServicesCatagoryRoute,
  },
  {
    path: '/notice',
    routes: NoticeRoutes,
  },
  {
    path: '/scroll-text',
    routes: ScrollTextRoutes,
  },

  //  buy sell
  {
    path: '/product-categorys',
    routes: ProductCatagoryRoute,
  },
  {
    path: '/sub-categorys',
    routes: SubCatagoryRoutes,
  },
  {
    path: '/products',
    routes: ProductRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
