"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const loginProfile = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is Required!' }),
        password: zod_1.z.string({ required_error: 'Password is Required!' }),
    }),
});
const updateProfile = zod_1.z.object({
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
        role: zod_1.z.enum([...Object.values(client_1.Role)]).optional(),
        department: zod_1.z
            .enum([...Object.values(client_1.Department)])
            .optional(),
        startTime: zod_1.z.string().optional(),
        endTime: zod_1.z.string().optional(),
        slots: zod_1.z.array(zod_1.z.string()).optional(),
        degrees: zod_1.z.array(zod_1.z.string()).optional(),
        dayOff: zod_1.z
            .enum([...Object.values(client_1.DayOff)])
            .optional(),
    }),
});
exports.AuthValidation = {
    loginProfile,
    updateProfile,
};
