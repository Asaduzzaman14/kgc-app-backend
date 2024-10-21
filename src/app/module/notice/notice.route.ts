import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { Controller } from './notice.controller';

const router = express.Router();

router.get('/notifaction-test', Controller.test);

router.post('/', Controller.create);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.updateData);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.deleteData);

router.get('/allnotice', Controller.getAlldataForAdmin);

router.get('/', Controller.getAlldata);

export const NoticeRoutes = router;
