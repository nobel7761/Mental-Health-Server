"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const patient_controller_1 = require("./patient.controller");
const patient_validation_1 = require("./patient.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(patient_validation_1.PatientValidation.createPatient), patient_controller_1.PatientController.createPatient);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), patient_controller_1.PatientController.getAllPatient);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), patient_controller_1.PatientController.getSinglePatient);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(patient_validation_1.PatientValidation.updatePatient), patient_controller_1.PatientController.updatePatient);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), patient_controller_1.PatientController.deletePatient);
exports.PatientRoutes = router;
