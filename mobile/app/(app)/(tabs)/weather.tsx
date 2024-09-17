import { ThemedText } from "@/components/ThemedText";
import { globalStyles } from "@/constants/styles";
import { useData } from "@/contexts/DataContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export default function Weather() {
  const { language, coords } = useData();
  if (!coords) return null;
  const [texts, setTexts] = useState({});
  useEffect(() => {
    setTexts({});
  }, [language]);
  const [data, setData] = useState({});
  return (
    <View style={globalStyles.pageWrapper}>
      <ThemedText>{JSON.stringify(data)}</ThemedText>
    </View>
  );
}
