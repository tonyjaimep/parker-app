import { useBffAction } from "@/modules/bff/hooks/use-bff-action";

export const useCheckOut = (reservationId: number) => {
  const { isLoading, execute: checkOut } = useBffAction(
    `/reservations/${reservationId}/check-out`,
  );

  return {
    checkOut,
    isLoading,
  };
};
