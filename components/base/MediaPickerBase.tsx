import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Layout } from '@/constants/Layout';
import * as ImagePicker from 'expo-image-picker';
import ImageView from '../view/ImageView';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';

type Props = BaseProps & {
  label?: JSX.Element, 
  onSelectMedia?: (data: any) => void,
};

const MediaPickerBase = ({label, onSelectMedia}: Props) => {  
  const [selectedMedia, setSelectedMedia] = useState<any>([]);
  const [selectedMediaPreview, setSelectedMediaPreview] = useState<any>([]);

  const updatePreviewSelection = (data: any) => {
    let mediaList = [...selectedMediaPreview];
    if (!selectedMediaPreview.includes(data.fileName)) {
      mediaList.push(data.fileName);
      setSelectedMediaPreview(mediaList);
    }
    else {
      mediaList = mediaList.filter((item: any) => item.fileName == data.fileName);
      setSelectedMediaPreview(mediaList);
    }
  }; 

  const renderImagePreview = (data: any) => {
    return (
      <TouchableOpacity 
        key={data.uri} 
        onPress={() => updatePreviewSelection(data)}
      >
        <ImageView 
          uri={data.uri} 
          width={80} 
          height={80} 
          resizeMode="cover" 
          style={styles.mediaPreview}
        />
        {selectedMediaPreview.includes(data.fileName) && <TextView>delete</TextView> } 
      </TouchableOpacity>
    );    
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
      let mediaList = [...selectedMedia];
      const mediaExists = mediaList.some(item => item.fileName === result.assets[0].fileName);
      if (!mediaExists) {
        mediaList.push(result.assets[0]);
        setSelectedMedia(mediaList);
        if (onSelectMedia) onSelectMedia(mediaList);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <TextView>{label}</TextView>
      </TouchableOpacity>

      { selectedMedia?.length > 0 &&
        <BoxView direction="row" align="flex-start" justify="left" style={styles.previewContainer}>
          { selectedMedia.map((data: any) => renderImagePreview(data) )}
        </BoxView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  previewContainer: {
    backgroundColor: 'red',
    paddingVertical: Layout.space.base,
  },
  mediaPreview: {
    //opacity: 0.5,
  },
});

export default MediaPickerBase;