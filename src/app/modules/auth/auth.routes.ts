import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginProfile),
  AuthController.loginProfile
);

router.get('/get-my-profile', AuthController.getMyProfile);

router.patch(
  '/update-my-profile',
  validateRequest(AuthValidation.updateProfile),
  AuthController.updateProfile
);

export const AuthRoutes = router;
