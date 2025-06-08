import { LotForm } from "@/modules/lots/components/lot-form";
import { useCreateLot } from "@/modules/lots/hooks/use-create-lot";
import { CreateLotRequestDto } from "@/modules/lots/types";
import { Screen } from "@/modules/ui/components/screen";
import { TitleText } from "@/modules/ui/components/text/title";
import { useRouter } from "expo-router";

export default function RegisterLotScreen() {
  const router = useRouter();

  const onSuccess = () => {
    router.navigate("/account/lots");
  };

  const { createLot } = useCreateLot({ onSuccess });

  const onSubmit = async (values: {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    spotsCount: string;
  }) => {
    createLot({
      ...values,
      location: {
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
      },
      spotsCount: Number(values.spotsCount),
    });
  };

  return (
    <Screen>
      <TitleText>Register Parking Lot</TitleText>
      <LotForm onSubmit={onSubmit} />
    </Screen>
  );
}
