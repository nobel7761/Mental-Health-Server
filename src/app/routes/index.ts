import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { PatientRoutes } from '../modules/patient/patient.routes';
import { SpecialistRoutes } from '../modules/specialist/specialist.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/patients',
    route: PatientRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/specialist',
    route: SpecialistRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
