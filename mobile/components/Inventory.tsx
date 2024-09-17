import { Texts } from "@/constants/texts";
import { useData } from "@/contexts/DataContext";
import { InventoryItemType } from "@/types";
import { Image } from "expo-image";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ThemedCard } from "./ThemedCard";
import { ThemedText } from "./ThemedText";

export default function Inventory() {
  const { sharedInventory: inventory, language } = useData();
  const [texts, setTexts] = useState({
    title: Texts[language].inventory,
    description: Texts[language].sharedInventoryDescription,
  });
  useEffect(() => {
    setTexts({
      title: Texts[language].inventory,
      description: Texts[language].sharedInventoryDescription,
    });
  }, [language]);
  return (
    <FlatList
      contentContainerStyle={{
        padding: 10,
      }}
      ListHeaderComponent={() => (
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <ThemedText style={{ fontSize: 18 }}>{texts.title}</ThemedText>
          <ThemedText style={{ fontSize: 14 }}>{texts.description}</ThemedText>
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
          <ThemedText
            style={{
              maxWidth: "100%",
              fontSize: 12,
            }}
          >
            X {item.quantity || 1} {item.price && `@ ₹${item.price}`}
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
