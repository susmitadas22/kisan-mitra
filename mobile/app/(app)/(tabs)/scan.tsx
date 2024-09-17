import { ThemedText } from "@/components/ThemedText";
import { globalStyles } from "@/constants/styles";
import { useData } from "@/contexts/DataContext";
import { DiseaseReponseType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useLogto } from "@logto/rn";
import axios from "axios";
import { Buffer } from "buffer";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const height = Dimensions.get("window").height;

export default function Home() {
  const { coords } = useData();
  const { getIdTokenClaims } = useLogto();
  const [sub, setSub] = useState<string | null>(null);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [buffer, setBuffer] = useState<Buffer | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiseaseReponseType | null>(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      let buffer = Buffer.from(result.assets[0].base64, "base64");
      setImage(result.assets[0]);
      const buff = await uriToBuffer(result.assets[0].uri);
      setBuffer(buff);
    }
  };

  const uriToBuffer = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const arrayBuffer = await new Response(blob).arrayBuffer();
    return Buffer.from(arrayBuffer);
  };

  const handleUpload = async () => {
    setLoading(true);

    const { data } = await axios.post(
      "http://192.168.232.76:3000/api/v1/uploads",
      {
        image: image?.base64,
        sub: sub,
        size: image?.fileSize?.toString(),
        type: image?.mimeType,
        coords: coords,
      }
    );
    setLoading(false);
    setResult(data.body);
    console.log(data.body);
  };
  const clear = () => {
    setLoading(false);
    setResult(null);
    setImage(null);
  };

  const setUser = async () => {
    const { sub } = await getIdTokenClaims();
    setSub(sub);
  };
  useEffect(() => {
    setUser();
  }, []);
  return (
    <View style={globalStyles.pageWrapper}>
      {!image && (
        <TouchableOpacity
          onPress={pickImage}
          style={[
            globalStyles.button,
            { position: "absolute", top: height - 250, left: 10 },
          ]}
        >
          <Ionicons name="camera" size={20} />
          <Text style={globalStyles.buttonText}>Select Crop Image</Text>
        </TouchableOpacity>
      )}
      {image && <Image source={{ uri: image.uri }} style={styles.image} />}

      {image && (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginVertical: 10,
          }}
        >
          <View style={globalStyles.horizontal}>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={handleUpload}
            >
              <Text style={globalStyles.buttonText}>Upload</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={clear} style={globalStyles.mutedButton}>
            <Text style={globalStyles.mutedButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}
      {!result && loading && <ActivityIndicator />}
      {result && !loading && (
        <View style={globalStyles.vertical}>
          <ThemedText>
            Disease Name: {result.disease.replaceAll("_", " ")}
          </ThemedText>
          <ThemedText>Disease Cause: {result.cause}</ThemedText>
          <ThemedText>Disease Cure: {result.cure}</ThemedText>
          <ThemedText>Disease Prevention: {result.preventions}</ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    objectFit: "cover",
    height: 200,
    borderRadius: 5,
  },
});
