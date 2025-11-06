import { Modal, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MiniTitleText } from "@/modules/ui/components/text/mini-title";
import Button from "@/modules/ui/components/button";
import { useState } from "react";
import { BodyText } from "@/modules/ui/components/text/body";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";

const dayItems = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const hourItems = Array.from({ length: 24 }).map((_, i) => i);

export const AvailabilitySelector = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(9);
  const [seeksAvailableNow, setSeeksAvailableNow] = useState(true);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const goBack = () => {
    setSeeksAvailableNow(true);
    closeModal();
  };

  const commit = () => {
    setSeeksAvailableNow(false);
    closeModal();
  };

  return (
    <View>
      <View className="bg-neutral-100 p-2 rounded-xl gap-2">
        {seeksAvailableNow ? (
          <MicroTitleText>Mostrando disponibilidades actuales</MicroTitleText>
        ) : (
          <MicroTitleText>
            Pronosticando disponibilidad este {dayItems[selectedDay]} a las{" "}
            {selectedTime}:00
          </MicroTitleText>
        )}
        <Button
          size="sm"
          label="Pronosticar disponibilidad"
          onPress={openModal}
        />
      </View>
      <Modal
        animationType="slide"
        visible={isModalOpen}
        onRequestClose={closeModal}
        className="flex-1"
        transparent
      >
        <View className="flex-1 justify-end px-1">
          <View className="px-4 bg-neutral-100 pb-safe pt-4 rounded-t-2xl">
            <MiniTitleText>Consultar disponibilidad</MiniTitleText>
            <Picker onValueChange={setSelectedDay} selectedValue={selectedDay}>
              {dayItems.map((name, index) => (
                <Picker.Item label={name} value={index} key={name} />
              ))}
            </Picker>
            <Picker
              onValueChange={setSelectedTime}
              selectedValue={selectedTime}
            >
              {hourItems.map((time) => (
                <Picker.Item label={`${time}:00`} value={time} key={time} />
              ))}
            </Picker>
            <View className="flex flex-row gap-3 justify-stretch">
              <Button
                variant="secondary"
                onPress={goBack}
                label="Volver"
                className="flex-1"
              />
              <Button
                variant="primary"
                onPress={commit}
                label="Aceptar"
                className="flex-1"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
