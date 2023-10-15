import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PatientController } from './patient.controller';
import { PatientValidation } from './patient.validation';

const router = express.Router();

//! create
router.post(
  '/',
  validateRequest(PatientValidation.createPatient),
  PatientController.createPatient
);

// router.get('/my-profile', PatientController.getMyProfile);

// router.patch(
//   '/update-my-profile',
//   validateRequest(PatientValidation.updateMyProfile),
//   PatientController.updateMyProfile
// );

//! get all
// router.get(
//   '/',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   PatientController.getAllPatient
// );

//! get single
// router.get(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   PatientController.getSinglePatient
// );

//! update single
// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   validateRequest(PatientValidation.updateSinglePatient),
//   PatientController.updateSinglePatient
// );

//! delete single
// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   PatientController.deleteSinglePatient
// );

// router.post(
//   '/create-psychologist',
//   auth(ENUM_USER_ROLE.ADMIN),
//   validateRequest(PatientValidation.createPatient),
//   PatientController.createPsychologist
// );

// router.get(
//   '/psychologist/:id',
//   auth(ENUM_USER_ROLE.ADMIN),
//   PatientController.getSinglePsychologist
// );

// router.patch(
//   '/psychologist/:id',
//   auth(ENUM_USER_ROLE.ADMIN),
//   PatientController.updateSinglePsychologist
// );

// router.delete(
//   '/psychologist/:id',
//   auth(ENUM_USER_ROLE.ADMIN),
//   PatientController.deleteSinglePsychologist
// );

// router.post(
//   '/create-doctor',
//   auth(ENUM_USER_ROLE.ADMIN),
//   validateRequest(PatientValidation.createPatient),
//   PatientController.createDoctor
// );

// router.get(
//   '/doctor/:id',
//   auth(ENUM_USER_ROLE.ADMIN),
//   PatientController.getSingleDoctor
// );

// router.patch(
//   '/doctor/:id',
//   auth(ENUM_USER_ROLE.ADMIN),
//   PatientController.updateSingleDoctor
// );

// router.delete(
//   '/doctor/:id',
//   auth(ENUM_USER_ROLE.ADMIN),
//   PatientController.deleteSingleDoctor
// );

export const PatientRoutes = router;
