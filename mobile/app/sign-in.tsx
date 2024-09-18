import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/colors";
import { globalStyles } from "@/constants/styles";
import { useLogto } from "@logto/rn";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { signIn, isAuthenticated } = useLogto();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      return router.push("/");
    }
  }, [isAuthenticated]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.dark.background,
      }}
    >
      <StatusBar style="light" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LottieView
              autoPlay
              style={{
                width: 200,
                height: 200,
              }}
              source={require("@/assets/animations/famer.json")}
            />
            <ThemedText
              style={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              KisanMitra
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity
          onPress={async () => signIn("dev.jabed.kisna://callback")}
          style={globalStyles.button}
        >
          <ThemedText style={globalStyles.buttonText}>Sign In</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
