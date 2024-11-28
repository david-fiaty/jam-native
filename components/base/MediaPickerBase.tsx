import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Layout } from '@/constants/Layout';
import * as ImagePicker from 'expo-image-picker';
import ImageView from '../view/ImageView';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';

type Props = BaseProps & {
  label?: JSX.Element, 
  value?: any,
  onSelectItem?: (data: any) => void,
  onDeleteItem?: (data: any) => void,
};

const MediaPickerBase = ({label, value, onSelectItem, onDeleteItem}: Props) => {  
  const [selectedMedia, setSelectedMedia] = useState<any>([]);
  const [selectedPreview, setSelectedPreview] = useState<any>([]);

  if (value?.length && !selectedMedia.length) {
    //setSelectedMedia(value);
    //setSelectedPreview(value.map((item: any) => item.fileName));
  }

  const deleteMedia = (data: any) => {
    let mediaList = [...selectedMedia];  
    mediaList = mediaList.filter((item: any) => item.fileName !== data.fileName);
    setSelectedMedia(mediaList);
    if (onDeleteItem) onDeleteItem(mediaList);
  };

  const updatePreviewSelection = (data: any) => {
    let mediaList = [...selectedPreview];
    if (!selectedPreview.includes(data.fileName)) {
      mediaList.push(data.fileName);
      setSelectedPreview(mediaList);
    }
    else {
      mediaList = mediaList.filter((item: any) => item.fileName === data.fileName);
      setSelectedPreview(mediaList);
    }
  }; 

  const renderImagePreview = (data: any) => {
    const isSelected = selectedPreview.includes(data.fileName);
    const imageStyle = {
      ...styles.mediaPreview,
      ...isSelected ? styles.selectedPreview : {},
    };

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
          style={imageStyle}
        />

        { isSelected && 
          <TouchableOpacity 
            style={styles.deleteMedia}
            onPress={() => deleteMedia(data)}
          >
            <IconView name="delete" theme="primary" size={8} />
          </TouchableOpacity>
        } 
      </TouchableOpacity>
    );    
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
      let mediaList = [...selectedMedia];
      for (const row of result?.assets) {
        let mediaExists = mediaList.some(item => item.fileName === row.fileName);
        if (!mediaExists) mediaList.push(row);
      }

      setSelectedMedia(mediaList);
      setSelectedPreview([]);
      if (onSelectItem) onSelectItem(mediaList);
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
    paddingVertical: Layout.space.base,
    gap: Layout.space.base*1.5,
  },
  mediaPreview: {
    borderRadius: Layout.radius.round,
  },
  selectedPreview: {
    opacity: 0.5,
  },
  deleteMedia: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default MediaPickerBase;