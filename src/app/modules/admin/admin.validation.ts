import { AdminDepartment, BloodGroup, Gender } from '@prisma/client';
import { z } from 'zod';

const createAdmin = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required!' }),
    email: z.string({ required_error: 'Email is Required!' }),
    password: z.string({ required_error: 'Password is Required!' }),
    phone_number: z.string({ required_error: 'Phone Number is Required!' }),
    profile_image: z.string({ required_error: 'Profile Image is Required!' }),
    gender: z.enum([...Object.values(Gender)] as [string, ...string[]], {
      required_error: 'Gender is Required!',
    }),
    department: z.enum(
      [...Object.values(AdminDepartment)] as [string, ...string[]],
      {
        required_error: 'Department for Admin is Required!',
      }
    ),
    blood_group: z.enum(
      [...Object.values(BloodGroup)] as [string, ...string[]],
      { required_error: 'Blood Group is Required!' }
    ),
  }),
});

const updateAdmin = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    phone_number: z.string().optional(),
    profile_image: z.string().optional(),
    gender: z
      .enum([...Object.values(Gender)] as [string, ...string[]])
      .optional(),
    department: z
      .enum([...Object.values(AdminDepartment)] as [string, ...string[]])
      .optional(),
    blood_group: z
      .enum([...Object.values(BloodGroup)] as [string, ...string[]])
      .optional(),
  }),
});

export const AdminValidation = {
  createAdmin,
  updateAdmin,
};
