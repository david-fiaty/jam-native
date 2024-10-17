import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';
import { StaticImage } from '../base/StaticImage';

type ImagePreviewProps = {
  selectedImage?: string;
};

const ImagePreview = ({selectedImage}: ImagePreviewProps) => {
  if (selectedImage) {
    return (
      <StaticImage source={selectedImage} style={styles.image} />
    );
  }

  return <></>;
};

const MediaPickerField = () => {  
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      console.log('No image was selected.');
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <View style={styles.container}>
        <Ionicons name="add" size={GlobalStyles.icon.size} style={styles.icon} />   
        <TextBlock>Add media</TextBlock>
      </View>
      
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
    flexDirection: 'row',
    gap: GlobalStyles.space.base,
    marginBottom: GlobalStyles.space.base,
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