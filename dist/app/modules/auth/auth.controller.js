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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_service_1 = require("./auth.service");
const loginProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.loginProfile(req.body);
    const _a = result, { refreshToken } = _a, others = __rest(_a, ["refreshToken"]);
    // set refresh token into cookie
    const cookieOptions = {
        secure: config_1.default.env === 'production' ? true : false,
        httpOnly: true, // to make sure that this cookie won't be accessible from client side
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Logged In successfully!',
        token: others.accessToken,
    });
}));
const getMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_b = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _b === void 0 ? void 0 : _b.id;
    const result = yield auth_service_1.AuthService.getMyProfile(authUserId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Profile Data Retrieved successfully!',
        data: result,
    });
}));
const updateProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const accessToken = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.decode(accessToken, { complete: true });
    const authUserId = (_c = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) === null || _c === void 0 ? void 0 : _c.id;
    const updatedProfile = yield auth_service_1.AuthService.updateProfile(authUserId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Profile Data Updated successfully!',
        data: updatedProfile,
    });
}));
exports.AuthController = {
    loginProfile,
    getMyProfile,
    updateProfile,
};
