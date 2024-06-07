import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
// import { FileUploadHelper } from '../../../helpers/fileUploderHelper';
import auth from '../../middlewares/auth';
import { Controller } from './services.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  Controller.create
);

router.get('/:id', Controller.getDataById);

// router.patch(
//   '/:id',
//   // auth(ENUM_USER_ROLE.USER),
//   FileUploadHelper.upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     return Controller.updateData(req, res, next);
//   }
// );

router.patch('/:id', 
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  Controller.updateData);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  Controller.deleteData
);

router.get('/', Controller.getAlldata);

export const ServicesRoutes = router;
