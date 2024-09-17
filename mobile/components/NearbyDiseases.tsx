import { Texts } from "@/constants/texts";
import { useData } from "@/contexts/DataContext";
import { DiseaseReponseType } from "@/types";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ThemedCard } from "./ThemedCard";
import { ThemedText } from "./ThemedText";

export default function NearbyDiseases() {
  const { nearbyDiseases, language } = useData();
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
      contentContainerStyle={{
        padding: 10,
      }}
      ListHeaderComponent={
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <ThemedText style={{ fontSize: 18 }}>{texts.title}</ThemedText>
          <ThemedText>{texts.description}</ThemedText>
        </View>
      }
      renderItem={({ item }) => {
        return <Item {...item} />;
      }}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      keyExtractor={(item) => item.id}
      data={nearbyDiseases}
    />
  );
}

const Item: React.FC<DiseaseReponseType> = (disease) => {
  return (
    <ThemedCard>
      <ThemedText>{disease.disease.replaceAll("_", " ")}</ThemedText>
    </ThemedCard>
  );
};
