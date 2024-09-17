import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/colors";
import { Texts } from "@/constants/texts";
import { useData } from "@/contexts/DataContext";
import { useBottomSheetModal } from "@/hooks/useBottomSheetModal";
import { useThemeColor } from "@/hooks/useThemeColor";
import { DiseaseReponseType } from "@/types";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

export default function Diseases() {
  const { diseases, language } = useData();
  const [texts, setTexts] = useState({
    title: Texts[language].nearbyDiseaseTitle,
    description: Texts[language].nearbyDiseaseDescription,
  });
  useEffect(() => {
    setTexts({
      title: Texts[language].nearbyDiseaseTitle,
      description: Texts[language].nearbyDiseaseDescription,
    });
  }, [language]);
  return (
    <>
      <Stack.Screen options={{ headerTitle: texts.title }} />
      <FlatList
        contentContainerStyle={{
          padding: 10,
        }}
        ListHeaderComponent={
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <ThemedText style={{ fontSize: 18 }}>{texts.title}</ThemedText>
            <ThemedText style={{ fontSize: 14 }}>
              {texts.description}
            </ThemedText>
          </View>
        }
        renderItem={({ item }) => {
          return <Item {...item} />;
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.id}
        data={diseases}
      />
    </>
  );
}

const Item: React.FC<DiseaseReponseType> = (disease) => {
  const { language } = useData();
  const [texts, setTexts] = useState({
    away: Texts[language].away,
    more: Texts[language].more,
  });
  useEffect(() => {
    setTexts({
      away: Texts[language].away,
      more: Texts[language].more,
    });
  }, [language]);
  const { modalRef, modalSnapPoints, openModal, renderBackdrop } =
    useBottomSheetModal({
      snapPoints: ["50%", "90%"],
    });
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
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
            {disease.disease?.replaceAll("_", " ").replace(/\s+/g, " ")}
          </ThemedText>
          <ThemedText
            style={{
              maxWidth: "100%",
              fontSize: 12,
            }}
          >
            Reported {moment(disease.createdAt).fromNow()}
          </ThemedText>
          <Pressable
            onPress={() => {
              openModal();
            }}
          >
            <ThemedText
              style={{
                maxWidth: "100%",
                fontSize: 14,
              }}
            >
              {disease?.symptoms?.length! > 35
                ? disease?.symptoms!.substring(0, 35) + "..."
                : disease.symptoms}{" "}
              {disease?.symptoms?.length! > 35 && texts.more}
            </ThemedText>
          </Pressable>
        </View>
        <View>
          <ThemedText
            style={{
              maxWidth: "100%",
              fontSize: 12,
            }}
          >
            {`(${disease.lat}, ${disease.lng})`}
          </ThemedText>
        </View>
      </View>
      <Image
        source={`https://kisan.jabed.dev/${disease.id}.${
          disease.mimeType.split("/")[1]
        }`}
        style={{
          width: "40%",
          height: 150,
        }}
        key={disease.id}
      />
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={modalRef}
        snapPoints={modalSnapPoints}
        index={0}
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
            <Image
              source={`https://kisan.jabed.dev/${disease.id}.${
                disease.mimeType.split("/")[1]
              }`}
              style={{
                width: "100%",
                height: 200,
                borderRadius: 5,
              }}
              contentFit="cover"
              key={disease.id}
            />
            <View
              style={{
                marginVertical: 10,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 24,
                }}
              >
                {disease.disease?.replaceAll("_", " ").replace(/\s+/g, " ")}
              </ThemedText>
              <ThemedText
                style={{
                  maxWidth: "100%",
                  fontSize: 12,
                }}
              >
                Reported {moment(disease.createdAt).fromNow()}{" "}
              </ThemedText>
            </View>
            <ThemedText
              style={{
                fontSize: 16,
                textDecorationLine: "underline",
              }}
            >
              Disease Cause:
            </ThemedText>
            <ThemedText>{disease?.cause}</ThemedText>
            <ThemedText
              style={{
                fontSize: 16,
                textDecorationLine: "underline",
              }}
            >
              Symptoms:
            </ThemedText>
            <ThemedText>{disease?.symptoms}</ThemedText>
            <ThemedText
              style={{
                fontSize: 16,
                textDecorationLine: "underline",
              }}
            >
              Prevention:
            </ThemedText>
            <ThemedText>{disease?.preventions}</ThemedText>
            <ThemedText
              style={{
                fontSize: 16,
                textDecorationLine: "underline",
              }}
            >
              Cure:
            </ThemedText>
            <ThemedText>{disease?.cure}</ThemedText>
          </ThemedView>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </ThemedCard>
  );
};
