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
exports.PatientController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const patient_constants_1 = require("./patient.constants");
const patient_service_1 = require("./patient.service");
const createPatient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield patient_service_1.PatientService.createPatient(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Patient Created Successfully',
        data: result,
    });
}));
const updatePatient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_a = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _a === void 0 ? void 0 : _a.id;
    const { id } = req.params;
    const result = yield patient_service_1.PatientService.updatePatient(id, req.body, authUserId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Patient Info Updated Successfully',
        data: result,
    });
}));
const deletePatient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_b = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _b === void 0 ? void 0 : _b.id;
    const { id } = req.params;
    const result = yield patient_service_1.PatientService.deletePatient(id, authUserId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Patient Deleted successfully',
        data: result,
    });
}));
const getAllPatient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_c = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _c === void 0 ? void 0 : _c.id;
    const filters = (0, pick_1.default)(req.query, patient_constants_1.PatientFilterAbleFileds);
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield patient_service_1.PatientService.getAllPatient(filters, options, authUserId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Patients Retrieved Successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSinglePatient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_d = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _d === void 0 ? void 0 : _d.id;
    const { id } = req.params;
    const result = yield patient_service_1.PatientService.getSinglePatient(id, authUserId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Patient Data Fetched successfully',
        data: result,
    });
}));
exports.PatientController = {
    createPatient,
    updatePatient,
    deletePatient,
    getAllPatient,
    getSinglePatient,
};
