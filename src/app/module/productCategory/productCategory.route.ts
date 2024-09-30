import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/fileUploderHelper';
import auth from '../../middlewares/auth';
import { Controller } from './productCategory.controller';
import { catagoryValidation } from './productCategory.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('icon'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = catagoryValidation.catagoryValidationZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return Controller.create(req, res, next);
  }
);

router.get('/:id', Controller.getDataById);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('icon'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = catagoryValidation.updateCatagoryValidationZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return Controller.updateData(req, res, next);
  }
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.deleteData);

router.get('/', Controller.getAlldata);

export const ProductCatagoryRoute = router;
