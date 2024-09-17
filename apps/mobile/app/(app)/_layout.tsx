import { useLogto } from "@logto/rn";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { Text, useColorScheme } from "react-native";

export default function AppLayout() {
  const { isInitialized, isAuthenticated } = useLogto();
  const colorScheme = useColorScheme();
  console.log({
    isInitialized,
    isAuthenticated,
  });
  if (!isInitialized) return null;
  if (!isAuthenticated) {
    console.log("Redirecting to sign-in...");
    return <Redirect href="/sign-in" />;
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  )
}
