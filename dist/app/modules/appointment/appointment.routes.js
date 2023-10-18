"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const appointment_controller_1 = require("./appointment.controller");
const appointment_validation_1 = require("./appointment.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.PATIENT), (0, validateRequest_1.default)(appointment_validation_1.AppointmentValidation.createAppointment), appointment_controller_1.AppointmentController.createAppointment);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.PATIENT), appointment_controller_1.AppointmentController.deleteAppointment);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.PATIENT), (0, validateRequest_1.default)(appointment_validation_1.AppointmentValidation.updateAppointment), appointment_controller_1.AppointmentController.updateAppointment);
exports.AppointmentRoutes = router;
