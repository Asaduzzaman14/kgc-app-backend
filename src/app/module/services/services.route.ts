import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { Controller } from './services.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.USER), Controller.create);

router.get('/:id', Controller.getDataById);

router.patch('/:id', auth(ENUM_USER_ROLE.USER), Controller.updateData);

router.delete('/:id', auth(ENUM_USER_ROLE.USER), Controller.deleteData);

router.get('/', Controller.getAlldata);

export const ServicesRoutes = router;
