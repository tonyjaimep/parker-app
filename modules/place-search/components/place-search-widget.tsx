import { TextInput } from "@/modules/ui/components/text-input";
import { ComponentRef, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { View } from "react-native";
import Button from "@/modules/ui/components/button";

type PlaceSearchWidgetProps = {
  onSearchTermChange?: (searchTerm: string) => void | Promise<void>;
  autoFocus?: boolean;
  defaultValue?: string;
  onClear?: () => void;
};

export const PlaceSearchWidget = ({
  onSearchTermChange,
  autoFocus,
  defaultValue,
  onClear,
}: PlaceSearchWidgetProps) => {
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);
  const router = useRouter();
  const route = useRoute();

  const shouldRedirectToSearchScreen = route.name !== "destination-search";

  const handlePress = shouldRedirectToSearchScreen
    ? () => {
        router.push("/destination-search");
      }
    : undefined;

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <View className="gap-2">
      <TextInput
        ref={inputRef}
        defaultValue={defaultValue}
        onChangeText={onSearchTermChange}
        placeholder="¿A dónde vamos?"
        disabled={shouldRedirectToSearchScreen}
        onPress={handlePress}
        className="shrink-1"
      />
      {shouldRedirectToSearchScreen && defaultValue ? (
        <Button
          label="Vaciar"
          variant="secondary"
          size="sm"
          onPress={onClear}
        />
      ) : null}
    </View>
  );
};
