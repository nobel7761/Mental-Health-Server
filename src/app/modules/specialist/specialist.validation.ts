import { BloodGroup, DayOff, Gender } from '@prisma/client';
import { z } from 'zod';

const createSpecialist = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required!' }),
    email: z.string({ required_error: 'Email is Required!' }),
    password: z.string({ required_error: 'Password is Required!' }),
    phone_number: z.string({ required_error: 'Phone Number is Required!' }),
    profile_image: z.string({ required_error: 'Profile Image is Required!' }),
    gender: z.enum([...Object.values(Gender)] as [string, ...string[]], {
      required_error: 'Gender is Required!',
    }),
    blood_group: z.enum(
      [...Object.values(BloodGroup)] as [string, ...string[]],
      { required_error: 'Blood Group is Required!' }
    ),
    startTime: z.string({ required_error: 'Start Time is Required!' }),
    endTime: z.string({ required_error: 'End Time is Required!' }),
    degrees: z.array(z.string({ required_error: 'Degree is Required' }), {
      required_error: 'Degrees are Required!',
    }),
    dayOff: z.enum([...Object.values(DayOff)] as [string, ...string[]], {
      required_error: 'Dayoff/Weekend is Required!',
    }),
  }),
});

const updateSpecialist = z.object({
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
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    degrees: z.array(z.string()).optional(),
    dayOff: z
      .enum([...Object.values(DayOff)] as [string, ...string[]])
      .optional(),
  }),
});

export const SpecialistValidation = {
  createSpecialist,
  updateSpecialist,
};
