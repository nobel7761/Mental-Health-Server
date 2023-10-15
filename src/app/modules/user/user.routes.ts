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

router.post(
  '/create-psychologist',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUser),
  UserController.createPsychologist
);

router.get(
  '/psychologist/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSinglePsychologist
);

router.patch(
  '/psychologist/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateSinglePsychologist
);

router.delete(
  '/psychologist/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteSinglePsychologist
);

// router.post(
//   '/create-psychologist',
//   auth(ENUM_USER_ROLE.ADMIN),
//   validateRequest(UserValidation.createUserOrPsychologistOrDoctor),
//   UserController.createUserOrUserOrPsychologistOrDoctor
// );

router.post(
  '/create-doctor',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUser),
  UserController.createDoctor
);

router.get(
  '/doctor/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleDoctor
);

router.patch(
  '/doctor/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateSingleDoctor
);

router.delete(
  '/doctor/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleDoctor
);

export const UserRoutes = router;
