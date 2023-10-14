import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdmin),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.createAdmin
);

router.get('/my-profile', AdminController.getMyProfile);

router.get('/', auth(ENUM_USER_ROLE.SUPER_ADMIN), AdminController.getAllAdmin);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getSingleAdmin
);

router.patch(
  '/update-my-profile',
  validateRequest(AdminValidation.updateAdmin),
  AdminController.updateMyProfile
);

router.patch(
  '/update-admin/:id',
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
