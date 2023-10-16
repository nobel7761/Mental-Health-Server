import moment from 'moment';
import { PATIENT_WATCHING_DURATION } from '../../../enums/specialist';

export const generateDoctorSlots = (
  startTime: string,
  endTime: string
): string[] => {
  const slots: string[] = [];
  const slotDurationMinutes = PATIENT_WATCHING_DURATION.DURATION;

  // Convert the startTime and endTime to Date objects
  const start = moment(startTime, 'h:mm a');
  const end = moment(endTime, 'h:mm a');

  // Loop to generate slots
  while (start.isBefore(end)) {
    slots.push(start.format('h:mma')); // Format and push the current time
    start.add(slotDurationMinutes, 'minutes'); // Increment by 10 minutes
  }

  return slots;
};

// Helper function to format time in "hh:mm am/pm" format
export const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Add leading zeros if needed
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${formattedHours}:${formattedMinutes}${ampm}`;
};
