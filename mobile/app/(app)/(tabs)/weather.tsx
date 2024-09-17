import { globalStyles } from "@/constants/styles";
import { useData } from "@/contexts/DataContext";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export default function Weather() {
  const { language } = useData();
  const [texts, setTexts] = useState({});
  useEffect(() => {
    setTexts({});
  }, [language]);
  return <View style={globalStyles.pageWrapper}></View>;
}
