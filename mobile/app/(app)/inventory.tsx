import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/colors";
import { Texts } from "@/constants/texts";
import { useData } from "@/contexts/DataContext";
import { useBottomSheetModal } from "@/hooks/useBottomSheetModal";
import { useThemeColor } from "@/hooks/useThemeColor";
import { InventoryItemType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function Inventory() {
  const { language, inventory } = useData();
  const [texts, setTexts] = useState({
    Inventory: Texts[language].Inventory,
    description: Texts[language].yourInventory,
  });
  useEffect(() => {
    setTexts({
      Inventory: Texts[language].Inventory,
      description: Texts[language].yourInventory,
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
        <FlashList
          contentContainerStyle={{
            padding: 10,
          }}
          ListHeaderComponent={
            <View
              style={{
                marginVertical: 10,
              }}
            >
              <ThemedText style={{ fontSize: 18 }}>
                {texts.Inventory}
              </ThemedText>
              <ThemedText style={{ fontSize: 14 }}>
                {texts.description}
              </ThemedText>
            </View>
          }
          data={inventory}
          estimatedItemSize={50}
          renderItem={({ item }) => <Item {...item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
              <ThemedText>Create</ThemedText>
            </ThemedView>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </>
  );
}

const Item: React.FC<InventoryItemType> = (item) => {
  return (
    <ThemedCard
      style={{
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: "60%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <ThemedText
            style={{
              maxWidth: "100%",
            }}
          >
            {item.name}
          </ThemedText>
          <ThemedText
            style={{
              maxWidth: "100%",
              fontSize: 12,
            }}
          >
            logged {moment(item.createdAt).format("DD/MM/YYYY")}
          </ThemedText>
        </View>
        {/* <View>
          {coords && (
            <ThemedText
              style={{
                maxWidth: "100%",
                fontSize: 12,
              }}
            >
              {/* {getDistance(
                coords.latitude,
                coords.longitude,
                disease.lat,
                disease.lng
              ).toFixed(2)}{" "}
              {texts.away} */}
        {/* </ThemedText> */}
        {/* )} */}
        {/* </View> */}
      </View>
      <Image
        source={{ uri: item.image_url || "https://via.placeholder.com/150" }}
        style={{
          width: "40%",
          height: 150,
        }}
        key={item.id}
      />
    </ThemedCard>
  );
};
