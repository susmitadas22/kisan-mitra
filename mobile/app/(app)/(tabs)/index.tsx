import LocationComponent from "@/components/Location";
import { globalStyles } from "@/constants/styles";
import useImageUpload from "@/hooks/useImageUpload";
import { Ionicons } from "@expo/vector-icons";
import { useLogto } from "@logto/rn";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";

export default function Home() {
  const [image, setImage] = useState<DocumentPickerResponse | null>(null);
  const [sub, setSub] = useState<string | null>(null);
  const { uploadImage } = useImageUpload();
  const { getIdTokenClaims } = useLogto();

  const pickImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        mode: "import",
        allowMultiSelection: false,
        copyTo: "cachesDirectory",
      });
      setImage(res[0]);
    } catch (err) {}
  };

  const handleUpload = async () => {
    if (!sub) return;
    const formData = new FormData();
    formData.append("sub", sub);
    if (image) {
      formData.append("image", {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    }
    try {
      const { data } = await axios.put(
        "http://192.168.232.76:3000/api/v1/uploads",
        formData
      );
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
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
      <LocationComponent />
      {!image && (
        <TouchableOpacity onPress={pickImage} style={globalStyles.button}>
          <Ionicons name="camera" size={20} />
          <Text style={globalStyles.buttonText}>Select Crop Image</Text>
        </TouchableOpacity>
      )}
      {image && (
        <View style={globalStyles.horizontal}>
          <Image source={{ uri: image.uri }} style={styles.image} />
          <TouchableOpacity style={globalStyles.button} onPress={handleUpload}>
            <Text style={globalStyles.buttonText}>Upload</Text>
          </TouchableOpacity>
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
