import { BloodGroup, DayOff, Department, Gender, Role } from '@prisma/client';
import { z } from 'zod';

const loginProfile = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required!' }),
    password: z.string({ required_error: 'Password is Required!' }),
  }),
});

const updateProfile = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    phone_number: z.string().optional(),
    profile_image: z.string().optional(),
    gender: z
      .enum([...Object.values(Gender)] as [string, ...string[]])
      .optional(),
    blood_group: z
      .enum([...Object.values(BloodGroup)] as [string, ...string[]])
      .optional(),
    role: z.enum([...Object.values(Role)] as [string, ...string[]]).optional(),
    department: z
      .enum([...Object.values(Department)] as [string, ...string[]])
      .optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    slots: z.array(z.string()).optional(),
    degrees: z.array(z.string()).optional(),
    dayOff: z
      .enum([...Object.values(DayOff)] as [string, ...string[]])
      .optional(),
  }),
});

export const AuthValidation = {
  loginProfile,
  updateProfile,
};
