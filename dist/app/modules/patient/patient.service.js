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
exports.PatientService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const patient_constants_1 = require("./patient.constants");
const createPatient = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExistsInAdmin = yield prisma_1.default.admin.findFirst({
        where: {
            email: data.email,
        },
    });
    const isEmailExistsInSpecialist = yield prisma_1.default.admin.findFirst({
        where: {
            email: data.email,
        },
    });
    if (isEmailExistsInAdmin || isEmailExistsInSpecialist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Duplicate Email Found!');
    }
    const isPhoneNumberExistsInPatient = yield prisma_1.default.admin.findFirst({
        where: {
            phone_number: data.phone_number,
        },
    });
    const isPhoneNumberExistsInSpecialist = yield prisma_1.default.admin.findFirst({
        where: {
            phone_number: data.phone_number,
        },
    });
    if (isPhoneNumberExistsInPatient || isPhoneNumberExistsInSpecialist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Duplicate Phone Number Found!');
    }
    const payload = Object.assign(Object.assign({}, data), { role: client_1.Role.PATIENT });
    const result = yield prisma_1.default.patient.create({
        data: payload,
    });
    return result;
});
const updatePatient = (id, dataToUpdate, authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield prisma_1.default.patient.findFirst({
        where: {
            id,
        },
    });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Patient Doesn't Exist");
    }
    const whereConditions = { id };
    if (authUserId) {
        const authUser = yield prisma_1.default.admin.findFirst({
            where: {
                id: authUserId,
            },
        });
        if (authUser) {
            if (authUser.department === client_1.Department.PATIENT_DEPARTMENT) {
                // When the authUser belongs to the 'Patient_MANAGEMENT' department,
                // allow updating only for Patients with the role 'Patient'.
                whereConditions.role = client_1.Role.PATIENT;
            }
            else if (authUser.department === client_1.Department.DOCTOR_DEPARTMENT) {
                // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
                // allow updating only for Patients with the role 'doctor'.
                whereConditions.role = client_1.Role.DOCTOR;
            }
            else if (authUser.department === client_1.Department.PSYCHOLOGIST_DEPARTMENT) {
                // When the authUser belongs to the 'PSYCHOLOGIST_MANAGEMENT' department,
                // allow updating only for Patients with the role 'psychologist'.
                whereConditions.role = client_1.Role.PSYCHOLOGIST;
            }
            else {
                // If the authUser is not authorized, throw an API error.
                throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to update this Patient');
            }
        }
    }
    const existingPatient = yield prisma_1.default.patient.findUnique({
        where: whereConditions,
    });
    if (!existingPatient) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access');
    }
    // Perform the update using Prisma.
    const updatedPatient = yield prisma_1.default.patient.update({
        where: whereConditions,
        data: dataToUpdate,
    });
    return updatedPatient;
});
const deletePatient = (id, authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield prisma_1.default.patient.findFirst({
        where: {
            id,
        },
    });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Patient Doesn't Exists");
    }
    const whereConditions = { id };
    if (authUserId) {
        const authUser = yield prisma_1.default.admin.findFirst({
            where: {
                id: authUserId,
            },
        });
        if (authUser) {
            if (authUser.department === client_1.Department.PATIENT_DEPARTMENT) {
                // When the authUser belongs to the 'USER_MANAGEMENT' department,
                // allow deleting only users with the role 'user'.
                whereConditions.role = client_1.Role.PATIENT;
            }
            else if (authUser.department === client_1.Department.DOCTOR_DEPARTMENT) {
                // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
                // allow deleting only users with the role 'doctor'.
                whereConditions.role = client_1.Role.DOCTOR;
            }
            else if (authUser.department === client_1.Department.PSYCHOLOGIST_DEPARTMENT) {
                // When the authUser belongs to the 'PSYCHOLOGIST_MANAGEMENT' department,
                // allow deleting only users with the role 'psychologist'.
                whereConditions.role = client_1.Role.PSYCHOLOGIST;
            }
            else {
                // If the authUser is not authorized, throw an API error.
                throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to delete this user');
            }
        }
    }
    const existingPatient = yield prisma_1.default.patient.findUnique({
        where: whereConditions,
    });
    if (!existingPatient) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to delete this user');
    }
    // Perform the deletion using Prisma.
    const result = yield prisma_1.default.patient.delete({
        where: whereConditions,
    });
    return result;
});
const getAllPatient = (filters, options, authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: patient_constants_1.PatientSearchableFields.map(field => ({
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
    if (authUserId) {
        const authUser = yield prisma_1.default.admin.findFirst({
            where: {
                id: authUserId,
            },
        });
        if (authUser) {
            if (authUser.role === client_1.Role.SUPER_ADMIN) {
                //do nothing here!
            }
            else if (authUser.department === client_1.Department.PATIENT_DEPARTMENT) {
                // When the authUser belongs to the 'USER_MANAGEMENT' department,
                // add a condition to fetch only users with the role 'user'.
                andConditions.push({
                    role: client_1.Role.PATIENT,
                });
            }
            else if (authUser.department === client_1.Department.DOCTOR_DEPARTMENT) {
                throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to get all Patient');
            }
            else if (authUser.department === client_1.Department.PSYCHOLOGIST_DEPARTMENT) {
                throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to get all Patient');
            }
            else {
                // If the authUser is not authorized, throw an API error.
                throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to get all Patient');
            }
        }
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.patient.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.patient.count({
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
const getSinglePatient = (id, authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield prisma_1.default.patient.findFirst({
        where: {
            id,
        },
    });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Doesn't Exist");
    }
    const whereConditions = { id };
    if (authUserId) {
        const authUser = yield prisma_1.default.admin.findFirst({
            where: {
                id: authUserId,
            },
        });
        if (authUser) {
            if (authUser.role === client_1.Role.SUPER_ADMIN) {
                //do nothing here
            }
            else if (authUser.department === client_1.Department.PATIENT_DEPARTMENT) {
                // When the authUser belongs to the 'USER_MANAGEMENT' department,
                // add a condition to fetch only users with the role 'user'.
                whereConditions.role = client_1.Role.PATIENT;
            }
            else if (authUser.department === client_1.Department.DOCTOR_DEPARTMENT) {
                // When the authUser belongs to the 'DOCTORS_MANAGEMENT' department,
                // add a condition to fetch only users with the role 'doctor'.
                whereConditions.role = client_1.Role.DOCTOR;
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
    }
    const result = yield prisma_1.default.patient.findUnique({
        where: whereConditions,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to access');
    }
    return result;
});
exports.PatientService = {
    createPatient,
    updatePatient,
    deletePatient,
    getAllPatient,
    getSinglePatient,
};
