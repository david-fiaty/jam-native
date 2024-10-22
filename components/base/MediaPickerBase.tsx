import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import ImageView from '../view/ImageView';
import TextView from '../view/TextView';
import IconView from '../view/IconView';
import BoxView from '../view/BoxView';

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

const MediaPickerBase = () => {  
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
      <BoxView direction="row" align="center" style={styles.container}>
        <IconView name="plus" theme="secondary" size={22} radius="round" />
        <TextView>Add media</TextView> 
      </BoxView>
      
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
    backgroundColor: 'yellow',
  },
  /*
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
  */
});

export default MediaPickerBase;