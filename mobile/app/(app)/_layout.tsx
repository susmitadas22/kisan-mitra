import { DataProvider } from "@/contexts/DataContext";
import { useLogto } from "@logto/rn";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function AppLayout() {
  const { isInitialized, isAuthenticated } = useLogto();
  const colorScheme = useColorScheme();
  if (!isInitialized) return null;
  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <DataProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="inventory"
            options={{
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="diseases"
            options={{
              headerBackTitleVisible: false,
            }}
          />
        </Stack>
      </DataProvider>
    </ThemeProvider>
  );
}
