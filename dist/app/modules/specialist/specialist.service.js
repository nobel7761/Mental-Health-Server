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
exports.SpecialistService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const specialist_constants_1 = require("./specialist.constants");
const specialist_utils_1 = require("./specialist.utils");
const createSpecialistDoctor = (authUserId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authUser = yield prisma_1.default.admin.findFirst({
        where: {
            id: authUserId,
        },
    });
    if (!authUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    const isEmailExistInSpecialist = yield prisma_1.default.patient.findFirst({
        where: {
            email: payload.email,
        },
    });
    const isEmailExistInAdmin = yield prisma_1.default.admin.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (isEmailExistInSpecialist || isEmailExistInAdmin) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email Already Exists!');
    }
    const isPhoneNumberExistInSpecialist = yield prisma_1.default.patient.findFirst({
        where: {
            phone_number: payload.phone_number,
        },
    });
    const isPhoneNumberExistInAdmin = yield prisma_1.default.admin.findFirst({
        where: {
            phone_number: payload.phone_number,
        },
    });
    if (isPhoneNumberExistInSpecialist || isPhoneNumberExistInAdmin) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Phone Number Already Exists!');
    }
    const slots = (0, specialist_utils_1.generateSpecialistSlots)(payload.startTime, payload.endTime);
    const specialistRole = client_1.Role.DOCTOR;
    const updatedData = Object.assign(Object.assign({}, payload), { slots, role: specialistRole });
    if (!((_a = authUser.department) === null || _a === void 0 ? void 0 : _a.includes(client_1.Role.DOCTOR))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!!!');
    }
    const result = yield prisma_1.default.specialist.create({
        data: updatedData,
    });
    return result;
});
const updateSpecialistDoctor = (authUserId, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const authUser = yield prisma_1.default.admin.findFirst({
        where: {
            id: authUserId,
        },
    });
    if (!authUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    const doctor = yield prisma_1.default.specialist.findFirst({
        where: {
            id: id,
            role: client_1.Role.DOCTOR,
        },
    });
    if (!doctor) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Doctor Doesn't Exists!");
    }
    if (payload.email) {
        const isEmailExistInSpecialist = yield prisma_1.default.patient.findFirst({
            where: {
                email: payload.email,
            },
        });
        const isEmailExistInAdmin = yield prisma_1.default.admin.findFirst({
            where: {
                email: payload.email,
            },
        });
        if (isEmailExistInSpecialist || isEmailExistInAdmin) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email Already Exists!');
        }
    }
    if (payload.phone_number) {
        const isPhoneNumberExistInSpecialist = yield prisma_1.default.patient.findFirst({
            where: {
                phone_number: payload.phone_number,
            },
        });
        const isPhoneNumberExistInAdmin = yield prisma_1.default.admin.findFirst({
            where: {
                phone_number: payload.phone_number,
            },
        });
        if (isPhoneNumberExistInSpecialist || isPhoneNumberExistInAdmin) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Phone Number Already Exists!');
        }
    }
    if (!((_b = authUser.department) === null || _b === void 0 ? void 0 : _b.includes(client_1.Role.DOCTOR))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!!!');
    }
    if (payload.startTime) {
        const slots = (0, specialist_utils_1.generateSpecialistSlots)(payload.startTime, doctor.endTime);
        payload = Object.assign(Object.assign({}, payload), { slots });
    }
    if (payload.endTime) {
        const slots = (0, specialist_utils_1.generateSpecialistSlots)(doctor.startTime, payload.endTime);
        payload = Object.assign(Object.assign({}, payload), { slots });
    }
    const result = yield prisma_1.default.specialist.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const createSpecialistPsychologist = (authUserId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const authUser = yield prisma_1.default.admin.findFirst({
        where: {
            id: authUserId,
        },
    });
    if (!authUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    const isEmailExistInSpecialist = yield prisma_1.default.patient.findFirst({
        where: {
            email: payload.email,
        },
    });
    const isEmailExistInAdmin = yield prisma_1.default.admin.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (isEmailExistInSpecialist || isEmailExistInAdmin) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email Already Exists!');
    }
    const isPhoneNumberExistInSpecialist = yield prisma_1.default.patient.findFirst({
        where: {
            phone_number: payload.phone_number,
        },
    });
    const isPhoneNumberExistInAdmin = yield prisma_1.default.admin.findFirst({
        where: {
            phone_number: payload.phone_number,
        },
    });
    if (isPhoneNumberExistInSpecialist || isPhoneNumberExistInAdmin) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Phone Number Already Exists!');
    }
    const slots = (0, specialist_utils_1.generateSpecialistSlots)(payload.startTime, payload.endTime);
    const specialistRole = client_1.Role.PSYCHOLOGIST;
    const updatedData = Object.assign(Object.assign({}, payload), { slots, role: specialistRole });
    if (!((_c = authUser.department) === null || _c === void 0 ? void 0 : _c.includes(client_1.Role.PSYCHOLOGIST))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!!!');
    }
    const result = yield prisma_1.default.specialist.create({
        data: updatedData,
    });
    return result;
});
const updateSpecialistPsychologist = (authUserId, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const authUser = yield prisma_1.default.admin.findFirst({
        where: {
            id: authUserId,
        },
    });
    if (!authUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    const psychologist = yield prisma_1.default.specialist.findFirst({
        where: {
            id: id,
            role: client_1.Role.PSYCHOLOGIST,
        },
    });
    if (!psychologist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Psychologist Doesn't Exists!");
    }
    if (payload.email) {
        const isEmailExistInSpecialist = yield prisma_1.default.patient.findFirst({
            where: {
                email: payload.email,
            },
        });
        const isEmailExistInAdmin = yield prisma_1.default.admin.findFirst({
            where: {
                email: payload.email,
            },
        });
        if (isEmailExistInSpecialist || isEmailExistInAdmin) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email Already Exists!');
        }
    }
    if (payload.phone_number) {
        const isPhoneNumberExistInSpecialist = yield prisma_1.default.patient.findFirst({
            where: {
                phone_number: payload.phone_number,
            },
        });
        const isPhoneNumberExistInAdmin = yield prisma_1.default.admin.findFirst({
            where: {
                phone_number: payload.phone_number,
            },
        });
        if (isPhoneNumberExistInSpecialist || isPhoneNumberExistInAdmin) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Phone Number Already Exists!');
        }
    }
    if (!((_d = authUser.department) === null || _d === void 0 ? void 0 : _d.includes(client_1.Role.PSYCHOLOGIST))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!!!');
    }
    if (payload.startTime) {
        const slots = (0, specialist_utils_1.generateSpecialistSlots)(payload.startTime, psychologist.endTime);
        payload = Object.assign(Object.assign({}, payload), { slots });
    }
    if (payload.endTime) {
        const slots = (0, specialist_utils_1.generateSpecialistSlots)(psychologist.startTime, payload.endTime);
        payload = Object.assign(Object.assign({}, payload), { slots });
    }
    const result = yield prisma_1.default.specialist.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteSpecialistDoctor = (authUserId, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const authUser = yield prisma_1.default.admin.findFirst({
        where: {
            id: authUserId,
        },
    });
    if (!authUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    const doctor = yield prisma_1.default.specialist.findFirst({
        where: {
            id: id,
            role: client_1.Role.DOCTOR,
        },
    });
    if (!doctor) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Doctor Doesn't Exists!");
    }
    if (!((_e = authUser.department) === null || _e === void 0 ? void 0 : _e.includes(client_1.Role.DOCTOR))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!!!');
    }
    const result = yield prisma_1.default.specialist.delete({
        where: {
            id: id,
        },
    });
    return result;
});
const deleteSpecialistPsychologist = (authUserId, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const authUser = yield prisma_1.default.admin.findFirst({
        where: {
            id: authUserId,
        },
    });
    if (!authUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    const psychologist = yield prisma_1.default.specialist.findFirst({
        where: {
            id: id,
            role: client_1.Role.PSYCHOLOGIST,
        },
    });
    if (!psychologist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Psychologist Doesn't Exists!");
    }
    if (!((_f = authUser.department) === null || _f === void 0 ? void 0 : _f.includes(client_1.Role.PSYCHOLOGIST))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!!!');
    }
    const result = yield prisma_1.default.specialist.delete({
        where: {
            id: id,
        },
    });
    return result;
});
const getAllDoctors = (filters, options, authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: specialist_constants_1.SpecialistSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    const authUser = yield prisma_1.default.admin.findFirst({
        where: {
            id: authUserId,
            OR: [
                {
                    role: client_1.Role.SUPER_ADMIN,
                },
                {
                    role: client_1.Role.ADMIN,
                    department: client_1.Department.DOCTOR_DEPARTMENT,
                },
            ],
        },
    });
    if (!authUser) {
        // If authUser does not exist, throw an API error.
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to get all Doctors');
    }
    if (authUser.role === client_1.Role.SUPER_ADMIN) {
        // Authenticated user is a SUPER_ADMIN, no need to add conditions.
        andConditions.push({
            role: client_1.Role.DOCTOR,
        });
    }
    else if ((_g = authUser.department) === null || _g === void 0 ? void 0 : _g.includes(client_1.Department.PATIENT_DEPARTMENT)) {
        // When the authUser belongs to the 'USER_MANAGEMENT' department,
        // throw an API error.
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to get all Doctors');
    }
    else if ((_h = authUser.department) === null || _h === void 0 ? void 0 : _h.includes(client_1.Department.DOCTOR_DEPARTMENT)) {
        // Authenticated user is a DOCTOR, add a condition to fetch only doctors.
        andConditions.push({
            role: client_1.Role.DOCTOR,
        });
    }
    else if ((_j = authUser.department) === null || _j === void 0 ? void 0 : _j.includes(client_1.Department.PSYCHOLOGIST_DEPARTMENT)) {
        // Authenticated user is in the 'PSYCHOLOGIST_DEPARTMENT', throw an API error.
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to get all Doctors');
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.specialist.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.specialist.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            size,
        },
        data: result,
    };
});
const getAllPsychologist = (filters, options, authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: specialist_constants_1.SpecialistSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    const authUser = yield prisma_1.default.admin.findFirst({
        where: {
            id: authUserId,
            OR: [
                {
                    role: client_1.Role.SUPER_ADMIN,
                },
                {
                    role: client_1.Role.ADMIN,
                    department: client_1.Department.PSYCHOLOGIST_DEPARTMENT,
                },
            ],
        },
    });
    if (!authUser) {
        // If authUser does not exist, throw an API error.
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to get all Psychologist');
    }
    if (authUser.role === client_1.Role.SUPER_ADMIN) {
        // Authenticated user is a SUPER_ADMIN, no need to add conditions.
        andConditions.push({
            role: client_1.Role.PSYCHOLOGIST,
        });
    }
    else if ((_k = authUser.department) === null || _k === void 0 ? void 0 : _k.includes(client_1.Department.PATIENT_DEPARTMENT)) {
        // When the authUser belongs to the 'USER_MANAGEMENT' department,
        // throw an API error.
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to get all Psychologist');
    }
    else if ((_l = authUser.department) === null || _l === void 0 ? void 0 : _l.includes(client_1.Department.DOCTOR_DEPARTMENT)) {
        // Authenticated user is a DOCTOR, add a condition to fetch only doctors.
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to get all Psychologist');
    }
    else if ((_m = authUser.department) === null || _m === void 0 ? void 0 : _m.includes(client_1.Department.PSYCHOLOGIST_DEPARTMENT)) {
        // Authenticated user is in the 'PSYCHOLOGIST_DEPARTMENT', throw an API error.
        andConditions.push({
            role: client_1.Role.PSYCHOLOGIST,
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.specialist.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.specialist.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            size,
        },
        data: result,
    };
});
const getSingleDoctor = (id, authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = yield prisma_1.default.admin.findFirst({
        where: {
            id: authUserId,
        },
    });
    if (!authUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    const whereConditions = { id };
    if (authUser) {
        if (authUser.role === client_1.Role.SUPER_ADMIN) {
            //do nothing here
            whereConditions.role = client_1.Role.DOCTOR;
        }
        else if (authUser.department === client_1.Department.PATIENT_DEPARTMENT) {
            // When the authUser belongs to the 'USER_MANAGEMENT' department,
            // add a condition to fetch only users with the role 'user'.
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access');
        }
        else if (authUser.department === client_1.Department.DOCTOR_DEPARTMENT) {
            // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
            // add a condition to fetch only users with the role 'doctor'.
            whereConditions.role = client_1.Role.DOCTOR;
        }
        else if (authUser.department === client_1.Department.PSYCHOLOGIST_DEPARTMENT) {
            // When the authUser belongs to the 'PSYCHOLOGIST_MANAGEMENT' department,
            // add a condition to fetch only users with the role 'psychologist'.
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access');
        }
        else {
            // If the authUser is not authorized, throw an API error.
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access');
        }
    }
    const result = yield prisma_1.default.specialist.findUnique({
        where: whereConditions,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access');
    }
    return result;
});
const getSinglePsychologist = (id, authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = yield prisma_1.default.admin.findFirst({
        where: {
            id: authUserId,
        },
    });
    if (!authUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    const whereConditions = { id };
    if (authUser) {
        if (authUser.role === client_1.Role.SUPER_ADMIN) {
            //do nothing here
            whereConditions.role = client_1.Role.PSYCHOLOGIST;
        }
        else if (authUser.department === client_1.Department.PATIENT_DEPARTMENT) {
            // When the authUser belongs to the 'USER_MANAGEMENT' department,
            // add a condition to fetch only users with the role 'user'.
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access');
        }
        else if (authUser.department === client_1.Department.DOCTOR_DEPARTMENT) {
            // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
            // add a condition to fetch only users with the role 'doctor'.
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access');
        }
        else if (authUser.department === client_1.Department.PSYCHOLOGIST_DEPARTMENT) {
            // When the authUser belongs to the 'PSYCHOLOGIST_MANAGEMENT' department,
            // add a condition to fetch only users with the role 'psychologist'.
            whereConditions.role = client_1.Role.PSYCHOLOGIST;
        }
        else {
            // If the authUser is not authorized, throw an API error.
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access');
        }
    }
    const result = yield prisma_1.default.specialist.findUnique({
        where: whereConditions,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access');
    }
    return result;
});
exports.SpecialistService = {
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
