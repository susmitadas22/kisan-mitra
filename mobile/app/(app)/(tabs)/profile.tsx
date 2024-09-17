import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { globalStyles } from "@/constants/styles";
import { useData } from "@/contexts/DataContext";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const LANGS = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "hi",
    name: "Hindi",
  },
  {
    code: "bn",
    name: "Bengali",
  },
  {
    code: "pn",
    name: "Punjabi",
  },
];

export default function Profile() {
  const { language, setLanguageToSecureStore } = useData();
  return (
    <View style={globalStyles.pageWrapper}>
      <ThemedCard>
        <View style={{ marginBottom: 20 }}>
          <ThemedText style={{ fontSize: 15, textTransform: "uppercase" }}>
            Change App Language
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
      {/* <FlatList
                horizontal
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                renderItem={({ item }) => {
                    return <Item
                        isCurrent={language === item.code}
                        {...item} />;
                }}
                keyExtractor={(item) => item.code}
                data={LANGS}
            /> */}
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
