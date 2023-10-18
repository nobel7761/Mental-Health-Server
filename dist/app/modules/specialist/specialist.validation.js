"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialistValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createSpecialist = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is Required!' }),
        email: zod_1.z.string({ required_error: 'Email is Required!' }),
        password: zod_1.z.string({ required_error: 'Password is Required!' }),
        phone_number: zod_1.z.string({ required_error: 'Phone Number is Required!' }),
        profile_image: zod_1.z.string({ required_error: 'Profile Image is Required!' }),
        gender: zod_1.z.enum([...Object.values(client_1.Gender)], {
            required_error: 'Gender is Required!',
        }),
        blood_group: zod_1.z.enum([...Object.values(client_1.BloodGroup)], { required_error: 'Blood Group is Required!' }),
        startTime: zod_1.z.string({ required_error: 'Start Time is Required!' }),
        endTime: zod_1.z.string({ required_error: 'End Time is Required!' }),
        degrees: zod_1.z.array(zod_1.z.string({ required_error: 'Degree is Required' }), {
            required_error: 'Degrees are Required!',
        }),
        dayOff: zod_1.z.enum([...Object.values(client_1.DayOff)], {
            required_error: 'Dayoff/Weekend is Required!',
        }),
    }),
});
const updateSpecialist = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        phone_number: zod_1.z.string().optional(),
        profile_image: zod_1.z.string().optional(),
        gender: zod_1.z
            .enum([...Object.values(client_1.Gender)])
            .optional(),
        blood_group: zod_1.z
            .enum([...Object.values(client_1.BloodGroup)])
            .optional(),
        startTime: zod_1.z.string().optional(),
        endTime: zod_1.z.string().optional(),
        degrees: zod_1.z.array(zod_1.z.string()).optional(),
        dayOff: zod_1.z
            .enum([...Object.values(client_1.DayOff)])
            .optional(),
    }),
});
exports.SpecialistValidation = {
    createSpecialist,
    updateSpecialist,
};
