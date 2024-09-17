import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
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
  const colorScheme = useColorScheme();
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
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </LogtoProvider>
  );
}

// function Layout() {
//   const { isAuthenticated, isInitialized } = useLogto();
//   console.log({ isAuthenticated, isInitialized });
//   if (isAuthenticated && isInitialized) {
//     return <AppLayout />;
//   }
//   return <AuthLayout />;
// }

// function AuthLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="sign-in" />
//     </Stack>
//   );
// }

// function AppLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       <Stack.Screen name="+not-found" />
//     </Stack>
//   );
// }
