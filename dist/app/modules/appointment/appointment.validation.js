"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentValidation = void 0;
const zod_1 = require("zod");
const createAppointment = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({ required_error: 'Date is Required!' }),
        slot: zod_1.z.string({ required_error: 'Time Slot is Required!' }),
        specialistId: zod_1.z.string({ required_error: 'Specialist Id is Required!' }),
    }),
});
const updateAppointment = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({ required_error: 'Date is Required!' }),
        slot: zod_1.z.string({ required_error: 'Time Slot is Required!' }),
    }),
});
exports.AppointmentValidation = {
    createAppointment,
    updateAppointment,
};
