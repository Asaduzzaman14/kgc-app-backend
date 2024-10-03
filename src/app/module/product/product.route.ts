import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/fileUploderHelper';
import auth from '../../middlewares/auth';
import { Controller } from './product.controller';

const router = express.Router();

router.get(
  '/get-my-products',
  auth(ENUM_USER_ROLE.USER),
  Controller.getMyAlldata
);

router.post(
  '/',
  FileUploadHelper.upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
  ]),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  Controller.create
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  Controller.getDataById
);

router.patch(
  '/:id',
  FileUploadHelper.upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
  ]),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  Controller.updateData
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  Controller.deleteData
);

router.get('/', Controller.getAlldata);

export const ProductRoutes = router;
