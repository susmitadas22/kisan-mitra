import useImageUpload from '@/hooks/useImageUpload';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import Axios from 'axios';
import { Button, Image, StyleSheet, View } from 'react-native';
export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const { uploadImage } = useImageUpload()

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

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', new File([image], 'image.jpg'));
    Axios.post(process.env.BACKEND_URL + '/api/v1/uploads', formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(image)
    // uploadImage()
  }
  return (
    <View style={styles.container}>
      <Button title="Pick Image" onPress={pickImage} />
      <Button title="Upload Image" onPress={handleUpload} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
