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
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const loginProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // Check if the user exists in any of the tables
    const user = (yield prisma_1.default.patient.findFirst({
        where: {
            email: email,
        },
    })) ||
        (yield prisma_1.default.admin.findFirst({
            where: {
                email: email,
            },
        })) ||
        (yield prisma_1.default.specialist.findFirst({
            where: {
                email: email,
            },
        }));
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User Does Not Exist!');
    }
    //! Verify the password using bcrypt
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
    //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect Password');
    // }
    if (user.password !== password) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Password Does Not Match!');
    }
    // User exists and password is correct, create access and refresh tokens
    const { id, role } = user;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const getMyProfile = (authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    // You can use the authUserId and authUserRole to determine the role-based access if needed
    // In this example, we are only using authUserId to fetch the user's profile
    // Find the user by ID, assuming the user can exist in any of the three tables
    const user = (yield prisma_1.default.patient.findFirst({
        where: {
            id: authUserId,
        },
    })) ||
        (yield prisma_1.default.admin.findFirst({
            where: {
                id: authUserId,
            },
        })) ||
        (yield prisma_1.default.specialist.findFirst({
            where: {
                id: authUserId,
            },
        }));
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User Not Found');
    }
    // If you need to return specific user data based on their role, you can add conditional logic here
    // Return the user's profile data
    return user;
});
const updateProfile = (authUserId, updatedProfileData) => __awaiter(void 0, void 0, void 0, function* () {
    // find the user first
    const user = (yield prisma_1.default.patient.findFirst({
        where: {
            id: authUserId,
        },
    })) ||
        (yield prisma_1.default.admin.findFirst({
            where: {
                id: authUserId,
            },
        })) ||
        (yield prisma_1.default.specialist.findFirst({
            where: {
                id: authUserId,
            },
        }));
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User Not Found');
    }
    let updatedUser = null;
    if (user.role === client_1.Role.PATIENT) {
        updatedUser = yield prisma_1.default.patient.update({
            where: { id: authUserId },
            data: updatedProfileData,
        });
    }
    else if (user.role === client_1.Role.ADMIN) {
        updatedUser = yield prisma_1.default.admin.update({
            where: { id: authUserId },
            data: updatedProfileData,
        });
    }
    else if (user.role === client_1.Role.SUPER_ADMIN) {
        updatedUser = yield prisma_1.default.admin.update({
            where: { id: authUserId },
            data: updatedProfileData,
        });
    }
    else if (user.role === client_1.Role.DOCTOR || user.role === client_1.Role.PSYCHOLOGIST) {
        updatedUser = yield prisma_1.default.specialist.update({
            where: { id: authUserId },
            data: updatedProfileData,
        });
    }
    // If you need to return specific user data based on their role, you can add conditional logic here
    // Return the updated user's profile data
    return updatedUser;
});
exports.AuthService = {
    loginProfile,
    getMyProfile,
    updateProfile,
};
