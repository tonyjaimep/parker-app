import Button, { ButtonVariant } from "@/modules/ui/components/button";

type ReservationActionBaseProps = {
  perform: () => void;
  variant: ButtonVariant;
  label: string;
};

export const ReservationActionBase = ({
  perform,
  variant,
  label,
}: ReservationActionBaseProps) => {
  return <Button variant={variant} onPress={perform} label={label} />;
};
