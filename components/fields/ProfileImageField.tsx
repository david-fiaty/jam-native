import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';
import { StaticImage } from '../base/StaticImage';
import ClearIcon from '../icons/ClearIcon';

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

const ProfileImageField = () => {  
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
        <Ionicons name="person-circle" size={80} color={GlobalStyles.icon.color} />
        <TextBlock style={styles.text}>Upload a Jam user profile image</TextBlock>
        <ClearIcon name="next" size={28}/>  
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
    alignItems: 'center',
    justifyContent: 'center',
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
    height: GlobalStyles.space.base*20,
    backgroundColor: Colors.tertiary,
  },
  text: {
    width: '50%',
  },
});

export default ProfileImageField;