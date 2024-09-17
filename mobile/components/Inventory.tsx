import { useData } from "@/contexts/DataContext";
import { DiseaseReponseType, InventoryItemType } from "@/types";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { ThemedCard } from "./ThemedCard";
import { ThemedText } from "./ThemedText";
import { FlatList, View } from "react-native";
import { Texts } from "@/constants/texts";

export default function Inventory() {
    const { inventory, language } = useData();
    const [texts, setTexts] = useState({
        title: Texts[language].nearbyDiseaseTitle,
        description: Texts[language].nearbyDiseaseDescription
    })
    useEffect(() => {
        setTexts({
            title: Texts[language].nearbyDiseaseTitle,
            description: Texts[language].nearbyDiseaseDescription
        })

    }, [language])
    return (
        <FlatList
            scrollEnabled={false}
            style={{ flexGrow: 0 }}

            renderItem={({ item }) => {
                return <Item {...item} />;
            }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            keyExtractor={(item) => item.id}
            data={inventory}
        />
    );
}

const Item: React.FC<InventoryItemType> = (item) => {
    return (
        <ThemedCard>
            <ThemedText>{item.name}</ThemedText>
        </ThemedCard>
    );
};
