import { differenceInSeconds } from "date-fns";

export const formatDurationToNow = (date: string | Date) => {
  const totalSeconds = Math.abs(differenceInSeconds(new Date(), date));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};
