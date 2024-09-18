import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/colors";
import { globalStyles } from "@/constants/styles";
import { Texts } from "@/constants/texts";
import { useData } from "@/contexts/DataContext";
import { useBottomSheetModal } from "@/hooks/useBottomSheetModal";
import { useThemeColor } from "@/hooks/useThemeColor";
import { InventoryItemType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useLogto } from "@logto/rn";
import { FlashList } from "@shopify/flash-list";
import axios from "axios";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function Inventory() {
  const { language, inventory, sub, refresh, refreshing } = useData();
  const { getIdTokenClaims } = useLogto();
  const [texts, setTexts] = useState({
    Inventory: Texts[language].Inventory,
    description: Texts[language].yourInventory,
  });
  useEffect(() => {
    setTexts({
      Inventory: Texts[language].Inventory,
      description: Texts[language].yourInventory,
    });
  }, [language]);
  const { closeModal, modalRef, modalSnapPoints, openModal, renderBackdrop } =
    useBottomSheetModal({
      snapPoints: ["80%"],
    });
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const upload = async () => {
    setLoading(true);
    const token = await getIdTokenClaims();
    try {
      closeModal();
      await axios.post("http://192.168.232.76:3000/api/v1/inventory", {
        name,
        price,
        quantity,
        sub: token.sub,
      });
      refresh();
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: texts.Inventory,
        }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <FlashList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          contentContainerStyle={{
            padding: 10,
          }}
          ListHeaderComponent={
            <View
              style={{
                marginVertical: 10,
              }}
            >
              <ThemedText style={{ fontSize: 18 }}>
                {texts.Inventory}
              </ThemedText>
              <ThemedText style={{ fontSize: 14 }}>
                {texts.description}
              </ThemedText>
            </View>
          }
          data={inventory}
          estimatedItemSize={50}
          renderItem={({ item }) => <Item {...item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
        <TouchableOpacity
          onPress={openModal}
          style={{
            position: "absolute",
            bottom: 60,
            zIndex: 1,
            right: 30,
            backgroundColor: Colors.dark.background,
            padding: 16,
            borderRadius: 50,
          }}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
        <BottomSheetModal
          ref={modalRef}
          snapPoints={modalSnapPoints}
          index={0}
          backdropComponent={renderBackdrop}
          handleStyle={{
            backgroundColor,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <BottomSheetScrollView
            style={{
              backgroundColor,
              padding: 5,
            }}
          >
            <ThemedView
              style={{
                flex: 1,
                padding: 10,
              }}
            >
              <ThemedText>Name</ThemedText>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
              <ThemedText>Price</ThemedText>
              <TextInput
                style={styles.input}
                value={price.toString()}
                onChangeText={(text) => setPrice(parseFloat(text))}
              />
              <ThemedText>Quantity</ThemedText>
              <TextInput
                style={styles.input}
                value={quantity.toString()}
                onChangeText={(text) => setQuantity(parseInt(text))}
              />
              <TouchableOpacity onPress={upload} style={globalStyles.button}>
                <ThemedText style={globalStyles.buttonText}>
                  {loading ? (
                    <ActivityIndicator color={Colors.dark.background} />
                  ) : (
                    "Upload"
                  )}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </>
  );
}

const Item: React.FC<InventoryItemType> = (item) => {
  const { refresh } = useData();
  return (
    <ThemedCard
      style={{
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: "60%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <ThemedText
            style={{
              maxWidth: "100%",
            }}
          >
            {item.name}
          </ThemedText>
          <ThemedText
            style={{
              maxWidth: "100%",
              fontSize: 12,
            }}
          >
            logged {moment(item.createdAt).format("DD/MM/YYYY")}
          </ThemedText>
        </View>
        <View>
          <Button
            title={item.shared ? "MARK SHARED" : "MARK AVAILABLE"}
            onPress={async () => {
              try {
                await axios.patch(
                  "http://192.168.232.76:3000/api/v1/inventory/shared",
                  {
                    id: item.id,
                  }
                );
                refresh();
              } catch (error) {}
            }}
          />
        </View>
      </View>
      <Image
        source={{ uri: item.image_url || "https://via.placeholder.com/150" }}
        style={{
          width: "40%",
          height: 150,
        }}
        key={item.id}
      />
    </ThemedCard>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.dark.background,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    color: Colors.dark.text,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
});
