import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/',
  // validateRequest(UserValidation.createAdminZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.createAdmin
);
export const UserRoutes = router;
