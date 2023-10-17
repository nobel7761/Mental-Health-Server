import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(AdminValidation.createAdmin),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.createAdmin
);

router.get('/', auth(ENUM_USER_ROLE.SUPER_ADMIN), AdminController.getAllAdmin);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getSingleAdmin
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AdminValidation.updateAdmin),
  AdminController.updateAdmin
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteSingleAdmin
);

export const AdminRoutes = router;
