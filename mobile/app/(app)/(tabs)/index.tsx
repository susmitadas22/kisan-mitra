import LocationComponent from "@/components/Location";
import { globalStyles } from "@/constants/styles";
import useImageUpload from "@/hooks/useImageUpload";
import { Ionicons } from "@expo/vector-icons";
import { useLogto } from "@logto/rn";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from "buffer";



export default function Home() {
  const { getIdTokenClaims } = useLogto()
  const [sub, setSub] = useState<string | null>(null);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [buffer, setBuffer] = useState<Buffer | null>(null);
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
      let buffer = Buffer.from(result.assets[0].base64, 'base64');
      setImage(result.assets[0]);
      const buff = await uriToBuffer(result.assets[0].uri);
      console.log(buff)
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

    axios.post("http://192.168.232.76:3000/api/v1/uploads", {
      image: image?.base64,
      sub: sub,
      size: image?.fileSize,
      type: image?.mimeType
    });
  }


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
