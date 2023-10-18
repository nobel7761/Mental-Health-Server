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
exports.AdminService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const admin_constants_1 = require("./admin.constants");
const createAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExistsInPatient = yield prisma_1.default.patient.findFirst({
        where: {
            email: data.email,
        },
    });
    const isEmailExistsInSpecialist = yield prisma_1.default.specialist.findFirst({
        where: {
            email: data.email,
        },
    });
    if (isEmailExistsInPatient || isEmailExistsInSpecialist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Duplicate Email Found!');
    }
    const isPhoneNumberExistsInPatient = yield prisma_1.default.patient.findFirst({
        where: {
            phone_number: data.phone_number,
        },
    });
    const isPhoneNumberExistsInSpecialist = yield prisma_1.default.specialist.findFirst({
        where: {
            phone_number: data.phone_number,
        },
    });
    if (isPhoneNumberExistsInPatient || isPhoneNumberExistsInSpecialist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Duplicate Phone Number Found!');
    }
    if (data.role === client_1.Role.SUPER_ADMIN) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You Can't Do This!");
    }
    else {
        const result = yield prisma_1.default.admin.create({
            data,
        });
        return result;
    }
});
const getAllAdmin = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: admin_constants_1.AdminSearchableFields.map(field => ({
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
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const admins = yield prisma_1.default.admin.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: 'desc' },
    });
    const result = admins.filter(admin => admin.role !== client_1.Role.SUPER_ADMIN);
    const total = result.length;
    return {
        meta: {
            total,
            page,
            size,
        },
        data: result,
    };
});
const getSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.admin.findUnique({
        where: { id },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin Doesn't Exists");
    }
    if (result.role === client_1.Role.SUPER_ADMIN) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden to Access!');
    }
    return result;
});
const updateAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield prisma_1.default.admin.findUnique({
        where: {
            id,
        },
    });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Admin Does Not Exists!');
    }
    if (payload.email) {
        const isEmailExistsInPatient = yield prisma_1.default.patient.findUnique({
            where: {
                email: payload.email,
            },
        });
        const isEmailExistsInSpecialist = yield prisma_1.default.specialist.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (isEmailExistsInPatient || isEmailExistsInSpecialist) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User Exists With This Email!');
        }
    }
    if (payload.phone_number) {
        const isPhoneNumberExistsInPatient = yield prisma_1.default.patient.findUnique({
            where: {
                phone_number: payload.phone_number,
            },
        });
        const isPhoneNumberExistsInSpecialist = yield prisma_1.default.specialist.findUnique({
            where: {
                phone_number: payload.phone_number,
            },
        });
        if (isPhoneNumberExistsInPatient || isPhoneNumberExistsInSpecialist) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User Exists With This Phone Number!');
        }
    }
    const result = yield prisma_1.default.admin.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield prisma_1.default.admin.findUnique({
        where: { id },
    });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin Doesn't Exists");
    }
    const result = yield prisma_1.default.admin.delete({
        where: { id },
    });
    return result;
});
exports.AdminService = {
    createAdmin,
    updateAdmin,
    getAllAdmin,
    getSingleAdmin,
    deleteSingleAdmin,
};
