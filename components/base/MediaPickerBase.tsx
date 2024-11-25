import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import * as ImagePicker from 'expo-image-picker';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';
import TextView from '../view/TextView';

type Props = BaseProps & {
  label?: JSX.Element, 
  onSelectMedia?: (data: any) => void,
};

const MediaPickerBase = ({label, onSelectMedia}: Props) => {  
  const [selectedMedia, setSelectedMedia] = useState<any>([]);

  const renderImage = (data: any) => {
    if (data?.uri) {
      return <ImageView key={data.uri} path={data.uri} style={styles.image} />;
    }

    return <></>;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      //base64: true,
    });

    if (!result.canceled && result?.assets?.length) {
      const mediaList = [...selectedMedia, ...result.assets];
      console.log(mediaList);
      setSelectedMedia(mediaList);
      if (onSelectMedia) onSelectMedia(mediaList);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <TextView>{label}</TextView>
      { selectedMedia?.length &&
        <View style={styles.preview}>
          { selectedMedia.map((data: any) => renderImage(data) )}
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