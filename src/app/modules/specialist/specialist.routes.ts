import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SpecialistController } from './specialist.controller';
import { SpecialistValidation } from './specialist.validation';

const router = express.Router();

router.post(
  '/create-doctor',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(SpecialistValidation.createSpecialist),
  SpecialistController.createSpecialistDoctor
);

router.post(
  '/create-psychologist',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(SpecialistValidation.createSpecialist),
  SpecialistController.createSpecialistPsychologist
);

router.patch(
  '/update-doctor/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(SpecialistValidation.updateSpecialist),
  SpecialistController.updateSpecialistDoctor
);

router.patch(
  '/update-psychologist/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(SpecialistValidation.updateSpecialist),
  SpecialistController.updateSpecialistPsychologist
);

router.delete(
  '/delete-doctor/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  SpecialistController.deleteSpecialistDoctor
);

router.delete(
  '/delete-psychologist/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  SpecialistController.deleteSpecialistPsychologist
);

router.get(
  '/get-all-doctors',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SpecialistController.getAllDoctors
);

router.get(
  '/get-all-psychologist',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SpecialistController.getAllPsychologist
);

router.get(
  '/get-single-doctor/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SpecialistController.getSingleDoctor
);

router.get(
  '/get-single-psychologist/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SpecialistController.getSinglePsychologist
);

export const SpecialistRoutes = router;
