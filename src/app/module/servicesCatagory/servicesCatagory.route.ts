import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { Controller } from './servicesCatagory.controller';

const router = express.Router();

router.post('/', Controller.create);

router.get('/:id', auth(ENUM_USER_ROLE.USER), Controller.getDataById);

router.patch('/:id', auth(ENUM_USER_ROLE.USER), Controller.updateData);

router.delete('/:id', auth(ENUM_USER_ROLE.USER), Controller.deleteData);

router.get('/', auth(ENUM_USER_ROLE.USER), Controller.getAlldata);

export const ServicesCatagoryRoute = router;
