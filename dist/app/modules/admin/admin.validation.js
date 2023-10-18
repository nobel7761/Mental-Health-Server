"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createAdmin = zod_1.z.object({
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
        role: zod_1.z.enum([...Object.values(client_1.Role)], {
            required_error: 'Role is Required!',
        }),
        department: zod_1.z
            .enum([...Object.values(client_1.Department)])
            .optional(),
    }),
});
const updateAdmin = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        phone_number: zod_1.z.string().optional(),
        profile_image: zod_1.z.string().optional(),
        gender: zod_1.z
            .enum([...Object.values(client_1.Gender)])
            .optional(),
        role: zod_1.z.enum([...Object.values(client_1.Role)]).optional(),
        department: zod_1.z
            .enum([...Object.values(client_1.Department)])
            .optional(),
        blood_group: zod_1.z
            .enum([...Object.values(client_1.BloodGroup)])
            .optional(),
    }),
});
exports.AdminValidation = {
    createAdmin,
    updateAdmin,
};
