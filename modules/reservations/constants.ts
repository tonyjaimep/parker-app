import { ReservationStatus } from "./types";

export const reservationStatusHeadingTextClassName: Record<
  ReservationStatus,
  string
> = {
  pending: "text-attention-900",
  active: "text-primary-900",
  completed: "text-positive-900",
  canceled: "text-negative-900",
  expired: "text-neutral-900",
  "check-out-initiated": "text-primary-900",
};

export const reservationStatusBackgroundClassName: Record<
  ReservationStatus,
  string
> = {
  pending: "bg-attention-200",
  active: "bg-primary-200",
  completed: "bg-positive-200",
  canceled: "bg-negative-200",
  expired: "bg-neutral-200",
  "check-out-initiated": "bg-primary-200",
};

export const reservationStatusTitles: Record<ReservationStatus, string> = {
  pending: "Pendiente",
  active: "Activa",
  "check-out-initiated": "Esperando confirmación de salida",
  completed: "Completada",
  canceled: "Cancelada",
  expired: "Expirada",
};

export const statusDescriptions: Record<ReservationStatus, string> = {
  pending: "Arrive before the expiration time to check into your parking spot",
  active: "You're checked in. The parking meter is running.",
  "check-out-initiated":
    "Waiting for check-out confirmation from the lot owner.",
  completed: "Your parking reservation is complete. Thank you!",
  canceled: "This parking reservation was canceled.",
  expired: "You did not check in before the expiration time.",
};
