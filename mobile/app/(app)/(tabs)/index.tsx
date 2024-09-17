import Inventory from "@/components/Inventory";
import NearbyDiseases from "@/components/NearbyDiseases";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function Explore() {
  return (
  
    <Tab.Navigator>
      <Tab.Screen name="Nearby Diseases" component={NearbyDiseases} />
      <Tab.Screen name="Inventory" component={Inventory} />
    </Tab.Navigator>
  );
}
