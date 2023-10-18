import { z } from 'zod';

const createAppointment = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is Required!' }),
    slot: z.string({ required_error: 'Time Slot is Required!' }),
    specialistId: z.string({ required_error: 'Specialist Id is Required!' }),
  }),
});

const updateAppointment = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is Required!' }),
    slot: z.string({ required_error: 'Time Slot is Required!' }),
  }),
});

export const AppointmentValidation = {
  createAppointment,
  updateAppointment,
};
