import { format } from "date-fns";

export const formatReservationDate = (timestamp: Date): string => {
  const shouldAddDay = timestamp.getDay() !== new Date().getDay();
  let result = format(timestamp, "HH:mm");

  if (shouldAddDay) {
    result = `${format(timestamp, "D")}, ${result}`;
  }

  return result;
};
