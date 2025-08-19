import { useMemo } from "react";
import { ReservationStatus } from "../../types";
import { View } from "react-native";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";

export const ReservationStatusBadge = ({
  status,
}: {
  status: ReservationStatus;
}) => {
  const containerClassName = useMemo(() => {
    switch (status) {
      case "pending":
        return "bg-attention-200";
      case "active":
        return "bg-primary-200";
      case "completed":
        return "bg-positive-200";
      case "cancelled":
        return "bg-negative-200";
      case "expired":
        return "bg-neutral-200";
      case "check-out-initiated":
        return "bg-primary-200";
    }
  }, [status]);

  const textClassName = useMemo(() => {
    switch (status) {
      case "pending":
        return "text-attention-900";
      case "active":
        return "text-primary-900";
      case "completed":
        return "text-positive-900";
      case "cancelled":
        return "text-negative-900";
      case "expired":
        return "text-neutral-900";
      case "check-out-initiated":
        return "text-attention-900";
    }
  }, [status]);

  const statusText = useMemo(() => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "active":
        return "Activa";
      case "check-out-initiated":
        return "Esperando confirmación de salida";
      case "completed":
        return "Completada";
      case "cancelled":
        return "Cancelada";
      case "expired":
        return "Expirada";
    }
  }, [status]);

  return (
    <View className={`${containerClassName} px-2 py-1 rounded-full`}>
      <MicroTitleText className={textClassName}>{statusText}</MicroTitleText>
    </View>
  );
};
