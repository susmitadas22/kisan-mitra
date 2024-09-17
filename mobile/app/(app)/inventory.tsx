import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/colors";
import { Texts } from "@/constants/texts";
import { useData } from "@/contexts/DataContext";
import { useBottomSheetModal } from "@/hooks/useBottomSheetModal";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function Inventory() {
  const { language, inventory } = useData();
  const [texts, setTexts] = useState({
    Inventory: Texts[language].Inventory,
  });
  useEffect(() => {
    setTexts({
      Inventory: Texts[language].Inventory,
    });
  }, [language]);
  const { closeModal, modalRef, modalSnapPoints, openModal, renderBackdrop } =
    useBottomSheetModal({
      snapPoints: ["80%"],
    });
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: texts.Inventory,
        }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <ThemedText>
          You can add your inventory items here. This is a sample text.
        </ThemedText>
        <FlashList
          data={inventory}
          estimatedItemSize={50}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={openModal}>
              <ThemedText>{item.name}</ThemedText>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          onPress={openModal}
          style={{
            position: "absolute",
            bottom: 60,
            zIndex: 1,
            right: 30,
            backgroundColor: Colors.dark.background,
            padding: 16,
            borderRadius: 50,
          }}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
        <BottomSheetModal
          ref={modalRef}
          snapPoints={modalSnapPoints}
          index={0}
          backdropComponent={renderBackdrop}
          handleStyle={{
            backgroundColor,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <BottomSheetScrollView
            style={{
              backgroundColor,
              padding: 5,
            }}
          >
            <ThemedView
              style={{
                flex: 1,
                padding: 10,
              }}
            >
              <ThemedText>Inventory Item 1</ThemedText>
              <ThemedText>Inventory Item 2</ThemedText>
              <ThemedText>Inventory Item 3</ThemedText>
              <ThemedText>Inventory Item 4</ThemedText>
              <ThemedText>Inventory Item 5</ThemedText>
            </ThemedView>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </>
  );
}
