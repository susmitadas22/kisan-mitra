import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { LogtoConfig, LogtoProvider } from "@logto/rn";

const config: LogtoConfig = {
  endpoint: "https://auth.jabed.dev/",
  appId: "q9dargddx63xp64dxwhfi",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <LogtoProvider config={config}>
      <Slot />
    </LogtoProvider>
  );
}

