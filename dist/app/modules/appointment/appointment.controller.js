"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const appointment_service_1 = require("./appointment.service");
const createAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_a = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield appointment_service_1.AppointmentService.createAppointment(authUserId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Appointment Placed Successfully',
        data: result,
    });
}));
const deleteAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_b = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _b === void 0 ? void 0 : _b.id;
    const { id } = req.params;
    const result = yield appointment_service_1.AppointmentService.deleteAppointment(authUserId, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Appointment Deleted Successfully',
        data: result,
    });
}));
const updateAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_c = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _c === void 0 ? void 0 : _c.id;
    const { id } = req.params;
    const result = yield appointment_service_1.AppointmentService.updateAppointment(authUserId, id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Appointment Updated Successfully',
        data: result,
    });
}));
exports.AppointmentController = {
    createAppointment,
    deleteAppointment,
    updateAppointment,
};
