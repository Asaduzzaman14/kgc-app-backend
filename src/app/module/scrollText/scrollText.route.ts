import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { Controller } from './scrollText.controller';

const router = express.Router();

router.post('/', Controller.create);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.updateData);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.deleteData);

router.get('/all', Controller.getAlldataForAdmin);

router.get('/', Controller.getAlldata);

export const ScrollTextRoutes = router;
