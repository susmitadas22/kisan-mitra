import useImageUpload from '@/hooks/useImageUpload';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button, Image, StyleSheet, Text, Touchable, View, TouchableOpacity } from 'react-native';
import { useLogto } from '@logto/rn';
import { Colors } from '@/constants/colors';
import { globalStyles } from '@/constants/styles';
export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const { uploadImage } = useImageUpload()
  const { getIdTokenClaims } = useLogto()
  const [id, setID] = useState('')
  const setUser = async () => {
    const { sub } = await getIdTokenClaims();
    setID(sub)
    console.log(sub);
  }
  useEffect(() => {
    setUser()
  }, [])

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
    formData.append('sub', id);
    Axios.put('http://192.168.232.76:3000/api/v1/uploads', formData)
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
      <TouchableOpacity
        style={globalStyles.button}
      >
        <Text>Press me</Text>
      </TouchableOpacity>
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
