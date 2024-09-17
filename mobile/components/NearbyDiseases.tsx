import { useData } from "@/contexts/DataContext";
import { DiseaseReponseType } from "@/types";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function NearbyDiseases() {
  const { nearbyDiseases } = useData();
  console.log(nearbyDiseases);
  return (
    <FlashList
      renderItem={({ item }) => {
        return <Item {...item} />;
      }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      estimatedItemSize={100}
      keyExtractor={(item) => item.id}
      data={nearbyDiseases}
    />
  );
}

const Item: React.FC<DiseaseReponseType> = (disease) => {
  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: "#cecece",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
      }}
    >
      <ThemedText>{disease.disease}</ThemedText>
      <ThemedText>{disease.cause}</ThemedText>
    </View>
  );
};
