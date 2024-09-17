import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { globalStyles } from "@/constants/styles";
import { Texts } from "@/constants/texts";
import { useData } from "@/contexts/DataContext";
import { Ionicons } from "@expo/vector-icons";
import { type IdTokenClaims, useLogto } from "@logto/rn";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const LANGS = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "hi",
    name: "हिंदी",
  },
  {
    code: "bn",
    name: "বাংলা",
  },
  {
    code: "pn",
    name: "ਪੰਜਾਬੀ",
  },
  {
    code: "as",
    name: "অসমীয়া",
  },
];

export default function Profile() {
  const { language } = useData();
  const [user, setUser] = useState<IdTokenClaims | null>(null);
  const { getIdTokenClaims, signOut } = useLogto();
  const [texts, setTexts] = useState({
    changeAppLanguage: Texts[language].changeAppLanguage,
    language: Texts[language].app_language,
  });
  useEffect(() => {
    const fetchUser = async () => {
      const claims = await getIdTokenClaims();
      setUser(claims);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    setTexts({
      changeAppLanguage: Texts[language].changeAppLanguage,
      language: Texts[language].app_language,
    });
  }, [language]);
  if (!user) return null;
  return (
    <View style={globalStyles.pageWrapper}>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={{ uri: user?.picture || "https://via.placeholder.com/150" }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
              {user?.username}
            </ThemedText>
            <Pressable
              onPress={() => {
                Alert.alert("Log out", "Are you sure you want to log out?", [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Log out",
                    onPress: async () => {
                      await signOut();
                    },
                  },
                ]);
              }}
            >
              <Ionicons name="log-out" size={25} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
      <ThemedCard>
        <View style={{ marginBottom: 20 }}>
          <ThemedText style={{ fontSize: 15 }}>
            {texts.changeAppLanguage}
          </ThemedText>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {LANGS.map((item) => {
            return (
              <Item
                key={item.code}
                isCurrent={language === item.code}
                {...item}
              />
            );
          })}
        </View>
      </ThemedCard>
    </View>
  );
}

const Item: React.FC<any> = ({ isCurrent, code, name }) => {
  const { setLanguageToSecureStore } = useData();
  return (
    <TouchableOpacity
      key={code}
      disabled={isCurrent}
      onPress={async () => await setLanguageToSecureStore(code)}
      style={[
        styles.itemContainer,
        isCurrent ? { backgroundColor: "white" } : {},
      ]}
    >
      <ThemedText style={{ color: isCurrent ? "black" : "white" }}>
        {name}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
