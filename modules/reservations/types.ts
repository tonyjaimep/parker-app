import { Lot } from "../lots/types";

export type Reservation = {
  id: number;
  expiresAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  checkInAt: string | null;
  checkOutAt: string | null;
  lot: Lot;
  status: ReservationStatus;
  spotId: number;
};

export type ReservationCreateDto = {
  lotId: number;
};

export type ReservationStatus =
  | "pending"
  | "active"
  | "completed"
  | "cancelled"
  | "expired";
