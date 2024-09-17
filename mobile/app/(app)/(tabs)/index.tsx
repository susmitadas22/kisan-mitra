import Inventory from "@/components/Inventory";
import NearbyDiseases from "@/components/NearbyDiseases";
import { globalStyles } from "@/constants/styles";
import React from "react";
import { ScrollView, View } from "react-native";

export default function Explore() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <NearbyDiseases />
      <Inventory />
      <Inventory />
    </ScrollView>
  );
}
