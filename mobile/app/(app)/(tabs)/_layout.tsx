import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Texts } from "@/constants/texts";
import { useData } from "@/contexts/DataContext";

export default function TabLayout() {
  const { language } = useData();
  const [texts, setTexts] = useState({
    Explore: Texts[language].Explore,
    Scan: Texts[language].Scan,
    Weather: Texts[language].Weather,
    Profile: Texts[language].Profile,
  });
  useEffect(() => {
    setTexts({
      Explore: Texts[language].Explore,
      Scan: Texts[language].Scan,
      Weather: Texts[language].Weather,
      Profile: Texts[language].Profile,
    });
  }, [language]);
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "white" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: texts.Explore,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "compass" : "compass-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: texts.Scan,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "scan" : "scan-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: texts.Weather,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "sunny" : "sunny-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: texts.Profile,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
