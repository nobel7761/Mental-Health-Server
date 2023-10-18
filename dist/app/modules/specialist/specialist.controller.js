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
exports.SpecialistController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const specialist_constants_1 = require("./specialist.constants");
const specialist_service_1 = require("./specialist.service");
const createSpecialistDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_a = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield specialist_service_1.SpecialistService.createSpecialistDoctor(authUserId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Doctor Created Successfully',
        data: result,
    });
}));
const updateSpecialistDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_b = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _b === void 0 ? void 0 : _b.id;
    const { id } = req.params;
    const result = yield specialist_service_1.SpecialistService.updateSpecialistDoctor(authUserId, id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Doctor's Info Updates Successfully",
        data: result,
    });
}));
const createSpecialistPsychologist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_c = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _c === void 0 ? void 0 : _c.id;
    const result = yield specialist_service_1.SpecialistService.createSpecialistPsychologist(authUserId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Psychologist Created Successfully',
        data: result,
    });
}));
const updateSpecialistPsychologist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_d = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _d === void 0 ? void 0 : _d.id;
    const { id } = req.params;
    const result = yield specialist_service_1.SpecialistService.updateSpecialistPsychologist(authUserId, id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Psychologist's Info Updates Successfully",
        data: result,
    });
}));
const deleteSpecialistDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_e = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _e === void 0 ? void 0 : _e.id;
    const { id } = req.params;
    const result = yield specialist_service_1.SpecialistService.deleteSpecialistDoctor(authUserId, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Doctor Deleted Successfully',
        data: result,
    });
}));
const deleteSpecialistPsychologist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_f = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _f === void 0 ? void 0 : _f.id;
    const { id } = req.params;
    const result = yield specialist_service_1.SpecialistService.deleteSpecialistPsychologist(authUserId, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Psychologist Deleted Successfully',
        data: result,
    });
}));
const getAllDoctors = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_g = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _g === void 0 ? void 0 : _g.id;
    const filters = (0, pick_1.default)(req.query, specialist_constants_1.SpecialistFilterAbleFileds);
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield specialist_service_1.SpecialistService.getAllDoctors(filters, options, authUserId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Doctors Retrieved Successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getAllPsychologist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_h = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _h === void 0 ? void 0 : _h.id;
    const filters = (0, pick_1.default)(req.query, specialist_constants_1.SpecialistFilterAbleFileds);
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield specialist_service_1.SpecialistService.getAllPsychologist(filters, options, authUserId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Psychologist's Retrieved Successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_j = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _j === void 0 ? void 0 : _j.id;
    const { id } = req.params;
    const result = yield specialist_service_1.SpecialistService.getSingleDoctor(id, authUserId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Doctor Data Fetched successfully',
        data: result,
    });
}));
const getSinglePsychologist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_k = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _k === void 0 ? void 0 : _k.id;
    const { id } = req.params;
    const result = yield specialist_service_1.SpecialistService.getSinglePsychologist(id, authUserId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Psychologist Data Fetched successfully',
        data: result,
    });
}));
exports.SpecialistController = {
    createSpecialistDoctor,
    updateSpecialistDoctor,
    createSpecialistPsychologist,
    updateSpecialistPsychologist,
    deleteSpecialistDoctor,
    deleteSpecialistPsychologist,
    getAllDoctors,
    getAllPsychologist,
    getSingleDoctor,
    getSinglePsychologist,
};
