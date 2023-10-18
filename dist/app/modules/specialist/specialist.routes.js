"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const specialist_controller_1 = require("./specialist.controller");
const specialist_validation_1 = require("./specialist.validation");
const router = express_1.default.Router();
router.post('/create-doctor', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(specialist_validation_1.SpecialistValidation.createSpecialist), specialist_controller_1.SpecialistController.createSpecialistDoctor);
router.post('/create-psychologist', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(specialist_validation_1.SpecialistValidation.createSpecialist), specialist_controller_1.SpecialistController.createSpecialistPsychologist);
router.patch('/update-doctor/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(specialist_validation_1.SpecialistValidation.updateSpecialist), specialist_controller_1.SpecialistController.updateSpecialistDoctor);
router.patch('/update-psychologist/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(specialist_validation_1.SpecialistValidation.updateSpecialist), specialist_controller_1.SpecialistController.updateSpecialistPsychologist);
router.delete('/delete-doctor/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), specialist_controller_1.SpecialistController.deleteSpecialistDoctor);
router.delete('/delete-psychologist/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), specialist_controller_1.SpecialistController.deleteSpecialistPsychologist);
router.get('/get-all-doctors', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), specialist_controller_1.SpecialistController.getAllDoctors);
router.get('/get-all-psychologist', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), specialist_controller_1.SpecialistController.getAllPsychologist);
router.get('/get-single-doctor/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), specialist_controller_1.SpecialistController.getSingleDoctor);
router.get('/get-single-psychologist/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), specialist_controller_1.SpecialistController.getSinglePsychologist);
exports.SpecialistRoutes = router;
