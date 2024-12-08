import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
// import { FileUploadHelper } from '../../../helpers/fileUploderHelper';
import { processImage, upload } from '../../../helpers/uplode';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Controller } from './services.controller';
import { serviceValidation } from './services.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  upload.single('image'),
  processImage,
  validateRequest(serviceValidation.servicesValidationZodSchema),
  Controller.create
);

// router.patch(
//   '/:id',
//   // auth(ENUM_USER_ROLE.USER),
//   FileUploadHelper.upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     return Controller.updateData(req, res, next);
//   }
// );

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  upload.single('image'),
  processImage,
  Controller.updateData
);

router.patch('/update-view/:id', Controller.updateCountData);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  Controller.deleteData
);

router.get('/get-my-services', auth(ENUM_USER_ROLE.USER), Controller.getMydata);

router.get('/:id', Controller.getDataById);

router.get(
  '/admin/all-services',
  auth(ENUM_USER_ROLE.ADMIN),
  Controller.getAlldataFAdmin
);

router.get('/', Controller.getAlldata);

export const ServicesRoutes = router;
