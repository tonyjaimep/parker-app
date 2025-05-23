import { Lot } from "../lots/types";

export type Reservation = {
  id: number;
  expiresAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  checkInAt: string | null;
  checkOutAt: string | null;
  lot: Lot;
};

export type ReservationCreateDto = {
  lotId: number;
};
