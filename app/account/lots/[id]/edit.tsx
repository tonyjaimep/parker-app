import { LotForm } from "@/modules/lots/components/lot-form";
import { useLot } from "@/modules/lots/hooks/use-lot";
import { useUpdateLot } from "@/modules/lots/hooks/use-update-lot";
import { Screen } from "@/modules/ui/components/screen";
import { TitleText } from "@/modules/ui/components/text/title";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function RegisterLotScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const parsedLotId = parseInt(id, 10);
  const { lot } = useLot(parsedLotId);

  const onSuccess = () => {
    router.back();
  };

  const { updateLot } = useUpdateLot(parsedLotId, { onSuccess });

  const onSubmit = async (values: {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    spotsCount: string;
  }) => {
    updateLot({
      ...values,
      location: {
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
      },
      spotsCount: Number(values.spotsCount),
    });
  };

  if (!lot) {
    return null;
  }

  return (
    <Screen>
      <TitleText>Edit Parking Lot</TitleText>
      <LotForm onSubmit={onSubmit} lot={lot || undefined} />
    </Screen>
  );
}
