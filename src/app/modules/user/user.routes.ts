import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.createUser),
  UserController.createUser
);

// router.post(
//   '/create-psychologist',
//   auth(ENUM_USER_ROLE.ADMIN),
//   validateRequest(UserValidation.createUserOrPsychologistOrDoctor),
//   UserController.createUserOrUserOrPsychologistOrDoctor
// );

// router.post(
//   '/create-psychologist',
//   auth(ENUM_USER_ROLE.ADMIN),
//   validateRequest(UserValidation.createUserOrPsychologistOrDoctor),
//   UserController.createUserOrUserOrPsychologistOrDoctor
// );

router.get('/my-profile', UserController.getMyProfile);

router.patch(
  '/update-my-profile',
  validateRequest(UserValidation.updateMyProfile),
  UserController.updateMyProfile
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getAllUser
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateSingleUser),
  UserController.updateSingleUser
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleUser
);

export const UserRoutes = router;
