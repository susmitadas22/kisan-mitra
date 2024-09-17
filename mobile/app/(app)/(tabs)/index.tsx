import LocationComponent from '@/components/Location';
import { globalStyles } from '@/constants/styles';
import useImageUpload from '@/hooks/useImageUpload';
import { Ionicons } from '@expo/vector-icons';
import { useLogto } from '@logto/rn';
import Axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const { uploadImage } = useImageUpload();
  const { getIdTokenClaims } = useLogto();
  const [id, setID] = useState("");
  const setUser = async () => {
    const { sub } = await getIdTokenClaims();
    setID(sub);
    console.log(sub);
  };
  useEffect(() => {
    setUser();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', new File([image], 'image.jpg', { type: "image/png" || "image/jpg" || "image/jpeg" }));
    formData.append('sub', id);
    Axios.put('http://192.168.232.76:3000/api/v1/uploads', formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <View style={globalStyles.pageWrapper}>
      <LocationComponent />
      {
        !image &&
        <TouchableOpacity
          onPress={pickImage}
          style={globalStyles.button}
        >
          <Ionicons name='camera' size={20} />
          <Text style={globalStyles.buttonText}>
            Select Crop Image
          </Text>
        </TouchableOpacity>
      }
      {
        image &&
        <View style={globalStyles.horizontal}>
          <Image source={{ uri: image }} style={styles.image} />

          <TouchableOpacity
            style={globalStyles.button}
          >
            <Text style={globalStyles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      }
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
    objectFit: 'cover',
    height: 200,
    borderRadius: 5,
  },
});
