import { IdTokenClaims, useLogto } from "@logto/rn";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Home() {
  const { getIdTokenClaims, signOut } = useLogto();
  const [user, setUser] = useState<IdTokenClaims | null>(null);
  const getUser = async () => {
    const user = await getIdTokenClaims();
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
      <Text
        style={{
          marginVertical: 10,
          color: "#fff",
        }}
      >
        {user ? JSON.stringify(user, null, 2) : "Loading user..."}
      </Text>
    </View>
  );
}
