import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SpecialistController } from './specialist.controller';
import { SpecialistValidation } from './specialist.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(SpecialistValidation.createSpecialist),
  SpecialistController.createSpecialist
);

export const SpecialistRoutes = router;
