import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import * as ImagePicker from 'expo-image-picker';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';

type Props = BaseProps & {
  label?: JSX.Element, 
  onSelectMedia?: (data: any) => void,
};

const MediaPickerBase = ({label, onSelectMedia}: Props) => {  
  const [selectedMedia, setSelectedMedia] = useState<any>([]);

  const ImagePreview = (selectedImage: string) => {
    return selectedImage ? <ImageView source={selectedImage} style={styles.image} /> : <></>;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result?.assets?.length) {
      let mediaList = {...selectedMedia, ...result.assets};
      setSelectedMedia(mediaList);
      if (onSelectMedia) onSelectMedia(mediaList);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      {label}
      { selectedMedia &&
        <View style={styles.preview}>
          <ImagePreview selectedImage={selectedMedia} />
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