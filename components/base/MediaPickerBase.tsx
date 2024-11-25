import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import * as ImagePicker from 'expo-image-picker';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';

type Props = BaseProps & {
  label?: JSX.Element, 
  onSelectMedia?: (data: any) => void,
};

const MediaPickerBase = ({label, onSelectMedia}: Props) => {  
  const [selectedMedia, setSelectedMedia] = useState<any>([]);
  const renderImage = (data: any) => {
    if (!data?.uri?.length) return <></>;
    return <ImageView key={data.uri} path={data.uri} width={32} height={32} resizeMode="cover" />;    
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
      setSelectedMedia(mediaList);
      if (onSelectMedia) onSelectMedia(mediaList);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <TextView>{label}</TextView>
      { selectedMedia?.length &&
        <BoxView direction="row" align="center" justify="space-between" style={styles.preview}>
          { selectedMedia.map((data: any) => renderImage(data) )}
        </BoxView>
      }
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  preview: {
    backgroundColor: 'red',
  },
});

export default MediaPickerBase;