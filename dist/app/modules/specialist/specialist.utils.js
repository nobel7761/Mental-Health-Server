"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = exports.generateSpecialistSlots = void 0;
const moment_1 = __importDefault(require("moment"));
const specialist_1 = require("../../../enums/specialist");
const generateSpecialistSlots = (startTime, endTime) => {
    const slots = [];
    const slotDurationMinutes = specialist_1.PATIENT_WATCHING_DURATION.DURATION;
    // Convert the startTime and endTime to Date objects
    const start = (0, moment_1.default)(startTime, 'h:mm a');
    const end = (0, moment_1.default)(endTime, 'h:mm a');
    // Loop to generate slots
    while (start.isBefore(end)) {
        slots.push(start.format('h:mma')); // Format and push the current time
        start.add(slotDurationMinutes, 'minutes'); // Increment by 10 minutes
    }
    return slots;
};
exports.generateSpecialistSlots = generateSpecialistSlots;
// Helper function to format time in "hh:mm am/pm" format
const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    // Convert hours to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    // Add leading zeros if needed
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes}${ampm}`;
};
exports.formatTime = formatTime;
