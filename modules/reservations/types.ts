import { Lot } from "../lots/types";

export type Reservation = {
  id: number;
  spot: {
    lot: Lot
  };
};

export type ReservationCreateDto = {
  spotId: number;
};
