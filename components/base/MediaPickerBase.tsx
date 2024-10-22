import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      {label}
      
      {/*
      <View style={styles.preview}>
        <ImagePreview selectedImage={selectedImage} />
      </View>
      */}
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MediaPickerBase;