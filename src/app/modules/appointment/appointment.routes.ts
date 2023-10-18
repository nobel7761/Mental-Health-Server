import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentController } from './appointment.controller';
import { AppointmentValidation } from './appointment.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.PATIENT),
  validateRequest(AppointmentValidation.createAppointment),
  AppointmentController.createAppointment
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.PATIENT),
  AppointmentController.deleteAppointment
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.PATIENT),
  validateRequest(AppointmentValidation.updateAppointment),
  AppointmentController.updateAppointment
);

export const AppointmentRoutes = router;
