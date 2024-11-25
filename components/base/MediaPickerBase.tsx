import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageView from '../view/ImageView';

type Props = {
  label: JSX.Element, 
};

type ImagePreviewProps = {
  selectedImage?: string;
};

const ImagePreview = ({selectedImage}: ImagePreviewProps) => {
  return selectedImage ? <ImageView source={selectedImage} style={styles.image} /> : <></>;
};

const MediaPickerBase = ({label}: Props) => {  
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.base64);
      console.log(result.base64);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      {label}
      { selectedImage &&
        <View style={styles.preview}>
          <ImagePreview selectedImage={selectedImage} />
        </View>
      }
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  preview: {},
  image: {},
});

export default MediaPickerBase;