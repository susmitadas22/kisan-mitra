import { useLogto } from "@logto/rn";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function AppLayout() {
  const { isInitialized, isAuthenticated } = useLogto();
  console.log({
    isInitialized,
    isAuthenticated,
  });
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (!isInitialized) {
    console.log("Loading...");
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!isAuthenticated) {
    console.log("Redirecting to sign-in...");
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
