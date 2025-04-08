import { Lot } from "../lots/types";

export type Reservation = {
  id: number;
  lot: Lot;
};

export type ReservationCreateDto = {
  lotId: number;
};
