import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
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

const MediaPickerField = ({label}: Props) => {  
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
  container: {
    paddingRight: Layout.space.base,
    backgroundColor: Colors.secondary,
    borderRadius: Layout.radius.round,
  },
  icon: {
    ...GlobalStyles.icon,
    ...{
      backgroundColor: Colors.tertiary,
      borderColor: Colors.tertiary,
      borderWidth: 1,
      borderRadius: 4,
    },
  },
  preview: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.tertiary,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default MediaPickerField;