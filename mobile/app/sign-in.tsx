import { useLogto } from "@logto/rn";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { signIn, isAuthenticated } = useLogto();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Redirecting to app...");
      // On web, static rendering will stop here as the user is authenticated
      // in the headless Node process that the pages are rendered in.
      return router.push("/");
    }
  }, [isAuthenticated]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="dark" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          title="Sign In"
          onPress={async () => signIn("dev.jabed.kisna://callback")}
        />
      </View>
    </SafeAreaView>
  );
}
