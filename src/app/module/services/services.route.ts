import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
// import { FileUploadHelper } from '../../../helpers/fileUploderHelper';
import { FileUploadHelper } from '../../../helpers/fileUploderHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Controller } from './services.controller';
import { serviceValidation } from './services.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  validateRequest(serviceValidation.servicesValidationZodSchema),
  Controller.create
);

router.patch(
  '/:id',
  // auth(ENUM_USER_ROLE.USER),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    return Controller.updateData(req, res, next);
  }
);

// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
//   Controller.updateData
// );

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  Controller.deleteData
);

router.get('/get-my-services', auth(ENUM_USER_ROLE.USER), Controller.getMydata);

router.get('/:id', Controller.getDataById);

router.get('/', Controller.getAlldata);

export const ServicesRoutes = router;
