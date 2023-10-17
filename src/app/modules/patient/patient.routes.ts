import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PatientController } from './patient.controller';
import { PatientValidation } from './patient.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(PatientValidation.createPatient),
  PatientController.createPatient
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PatientController.getAllPatient
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PatientController.getSinglePatient
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(PatientValidation.updatePatient),
  PatientController.updatePatient
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  PatientController.deletePatient
);

export const PatientRoutes = router;
