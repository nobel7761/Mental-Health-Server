"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_routes_1 = require("../modules/admin/admin.routes");
const appointment_routes_1 = require("../modules/appointment/appointment.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const patient_routes_1 = require("../modules/patient/patient.routes");
const specialist_routes_1 = require("../modules/specialist/specialist.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/patients',
        route: patient_routes_1.PatientRoutes,
    },
    {
        path: '/admins',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/specialist',
        route: specialist_routes_1.SpecialistRoutes,
    },
    {
        path: '/appointment',
        route: appointment_routes_1.AppointmentRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
