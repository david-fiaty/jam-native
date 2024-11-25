import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';

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
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      MediaManager.getBase64Data(result.assets[0].uri).then((data: any) => {
        setSelectedImage(data);
        console.log(data);
      });
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