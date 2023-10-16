import { BloodGroup, DayOff, Department, Gender, Role } from '@prisma/client';

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IProfileDataResponse = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  profile_image: string;
  gender: Gender;
  blood_group: BloodGroup;
  role: Role;
  department?: Department | null; // Make department nullable
  startTime?: string;
  endTime?: string;
  slots?: string[];
  degrees?: string[];
  dayOff?: DayOff;
};
