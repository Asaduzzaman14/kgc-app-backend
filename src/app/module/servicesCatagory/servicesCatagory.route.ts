import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { Controller } from './servicesCatagory.controller';

const router = express.Router();

router.post('/', Controller.create);

router.get('/:id', Controller.getDataById);

router.patch('/:id', Controller.updateData);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.deleteData);

router.get('/', Controller.getAlldata);

export const ServicesCatagoryRoute = router;
