import { Reservation } from "../reservations/types";

export type RealtimeUpdateType = "reservation-updated";

export type RealtimeUpdatePayload<T extends RealtimeUpdateType> =
  T extends "reservation-updated" ? Reservation : never;

export type RealtimeUpdate<T extends RealtimeUpdateType> = {
  updateType: T;
  payload: RealtimeUpdatePayload<T>;
};
