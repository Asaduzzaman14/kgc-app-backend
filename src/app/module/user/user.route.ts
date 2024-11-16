import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { processImage, upload } from '../../../helpers/uplode';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/all-donnor', UserController.getDonors);

router.post('/', UserController.create);

router.get(
  '/profile',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserController.getDataById
);

router.patch(
  '/profile/update/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  upload.single('image'),
  processImage,
  validateRequest(UserValidation.updateProfileSchema),
  UserController.updateProfile
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteData);

export const UserRoutes = router;
