"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.createAdmin), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), admin_controller_1.AdminController.createAdmin);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), admin_controller_1.AdminController.getAllAdmin);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), admin_controller_1.AdminController.getSingleAdmin);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(admin_validation_1.AdminValidation.updateAdmin), admin_controller_1.AdminController.updateAdmin);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), admin_controller_1.AdminController.deleteSingleAdmin);
exports.AdminRoutes = router;
