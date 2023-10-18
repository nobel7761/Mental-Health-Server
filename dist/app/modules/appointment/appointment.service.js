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
exports.AppointmentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const moment_1 = __importDefault(require("moment"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createAppointment = (authUserId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authUser = (yield prisma_1.default.patient.findFirst({
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
        if (!authUser) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized.');
        }
        const isSlotExists = yield prisma_1.default.booking.findFirst({
            where: {
                slot: payload.slot,
                date: payload.date,
                specialistId: payload.specialistId,
            },
        });
        const specialist = yield prisma_1.default.specialist.findFirst({
            where: {
                id: payload.specialistId,
            },
        });
        if (isSlotExists) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `${specialist === null || specialist === void 0 ? void 0 : specialist.name} is busy on ${(0, moment_1.default)(payload.date).format(`Do of MMMM, YYYY`)} at ${payload.slot}`);
        }
        //inserting patient id from the auth user.
        payload = Object.assign(Object.assign({}, payload), { patientId: authUser.id });
        const result = yield prisma_1.default.booking.create({
            data: payload,
            include: {
                specialist: true,
                patient: true,
            },
        });
        return result;
    }
    catch (error) {
        // Handle the error, log it, and provide more information about the issue.
        console.error('Error creating appointment:', error);
        throw error; // Rethrow the error to propagate it to the caller.
    }
});
const updateAppointment = (authUserId, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = (yield prisma_1.default.patient.findFirst({
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
    if (!authUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized.');
    }
    const booking = yield prisma_1.default.booking.findFirst({
        where: {
            id,
        },
    });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'No Booking Found');
    }
    const isSlotExists = yield prisma_1.default.booking.findFirst({
        where: {
            slot: payload.slot,
            date: payload.date,
            specialistId: booking.specialistId,
        },
    });
    const specialist = yield prisma_1.default.specialist.findFirst({
        where: {
            id: booking.specialistId,
        },
    });
    if (isSlotExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `${specialist === null || specialist === void 0 ? void 0 : specialist.name} is busy on ${(0, moment_1.default)(payload.date).format(`Do of MMMM, YYYY`)} at ${payload.slot}`);
    }
    const result = yield prisma_1.default.booking.update({
        where: {
            id,
        },
        data: payload,
        include: {
            specialist: true,
            patient: true,
        },
    });
    return result;
});
const deleteAppointment = (authUserId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = (yield prisma_1.default.patient.findFirst({
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
    if (!authUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized.');
    }
    const booking = yield prisma_1.default.booking.findFirst({
        where: {
            id,
        },
    });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found.');
    }
    if (authUser.id === booking.patientId) {
        const result = yield prisma_1.default.booking.delete({
            where: {
                id,
            },
            include: {
                specialist: true,
                patient: true,
            },
        });
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'you are not authorized!');
    }
});
exports.AppointmentService = {
    createAppointment,
    deleteAppointment,
    updateAppointment,
};
