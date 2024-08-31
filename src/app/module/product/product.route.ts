import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/fileUploderHelper';
import auth from '../../middlewares/auth';
import { Controller } from './product.controller';

const router = express.Router();

router.post(
  '/',

  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  FileUploadHelper.upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
  ]),
  Controller.create
);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.getDataById);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.updateData);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.deleteData);

router.get('/', Controller.getAlldata);

export const ProductRoutes = router;
