import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import * as ImagePicker from 'expo-image-picker';
import ImageView from '../view/ImageView';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import { Layout } from '@/constants/Layout';

type Props = BaseProps & {
  label?: JSX.Element, 
  onSelectMedia?: (data: any) => void,
};

const MediaPickerBase = ({label, onSelectMedia}: Props) => {  
  const [layout, setLayout] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState<any>([]);

  const onLayout = (event: any) => {
    setLayout(event.nativeEvent.layout);
  };

  const handleTap = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    if (
      layout &&
      pageX >= layout.x &&
      pageX <= layout.x + layout.width &&
      pageY >= layout.y &&
      pageY <= layout.y + layout.height
    ) {
      console.log('Tapped inside the component!');
    } else {
      console.log('Tapped outside the component!');
    }
  };

  const renderImage = (data: any) => {
    if (data?.uri?.length) {
      return (
        <ImageView 
          key={data.uri} 
          uri={data.uri} 
          width={64} 
          height={64} 
          resizeMode="cover" 
        />
      );    
    }

    return <></>;
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
      const mediaList = [...selectedMedia, ...result.assets];
      setSelectedMedia(mediaList);
      if (onSelectMedia) onSelectMedia(mediaList);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <TextView>{label}</TextView>
      </TouchableOpacity>

      { selectedMedia?.length &&
        <BoxView direction="row" align="flex-start" justify="left" style={styles.preview}>
          { selectedMedia.map((data: any) => renderImage(data) )}
        </BoxView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  preview: {
    backgroundColor: 'red',
    paddingVertical: Layout.space.base,
  },
});

export default MediaPickerBase;