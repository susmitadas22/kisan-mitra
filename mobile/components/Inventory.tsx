import { Texts } from "@/constants/texts";
import { useData } from "@/contexts/DataContext";
import { InventoryItemType } from "@/types";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ThemedCard } from "./ThemedCard";
import { ThemedText } from "./ThemedText";

export default function Inventory() {
  const { inventory, language } = useData();
  const [texts, setTexts] = useState({
    title: Texts[language].nearbyDiseaseTitle,
    description: Texts[language].nearbyDiseaseDescription,
  });
  useEffect(() => {
    setTexts({
      title: Texts[language].nearbyDiseaseTitle,
      description: Texts[language].nearbyDiseaseDescription,
    });
  }, [language]);
  return (
    <FlatList
      scrollEnabled={false}
      contentContainerStyle={{
        padding: 10,
      }}
      ListHeaderComponent={() => (
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <ThemedText>{texts.title}</ThemedText>
          <ThemedText>{texts.description}</ThemedText>
        </View>
      )}
      renderItem={({ item }) => {
        return <Item {...item} />;
      }}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      keyExtractor={(item) => item.id}
      data={inventory}
    />
  );
}

const Item: React.FC<InventoryItemType> = (item) => {
  return (
    <ThemedCard>
      <ThemedText>{item.name}</ThemedText>
    </ThemedCard>
  );
};
