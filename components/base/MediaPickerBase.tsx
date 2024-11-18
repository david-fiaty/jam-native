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
  if (selectedImage) {
    return (
      <ImageView source={selectedImage} style={styles.image} />
    );
  }

  return <></>;
};

const MediaPickerBase = ({label}: Props) => {  
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });


    console.log(result);
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(selectedImage);
    }
    else {
      console.log('Cancelled');
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
});

export default MediaPickerBase;