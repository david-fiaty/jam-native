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
  onSelectMedia?: (data: any) => void,
};

const MediaPickerBase = ({label, onSelectMedia}: Props) => {  
  const [selectedMedia, setSelectedMedia] = useState<any>([]);
  const [selectedPreview, setSelectedPreview] = useState<any>([]);

  const deleteMedia = (data: any) => {
    let selectedMediaList = [...selectedMedia];  
    let selectedPreviewList = [...selectedPreview];
    selectedMediaList = selectedMediaList.filter((item: any) => item.fileName !== data.fileName);
    selectedPreviewList = selectedPreviewList.filter((value: any) => value !== data.fileName);
    setSelectedMedia(selectedMediaList);
    setSelectedPreview(selectedPreviewList);
  };

  const updatePreviewSelection = (data: any) => {
    let selectedMediaList = [...selectedPreview];
    if (!selectedPreview.includes(data.fileName)) {
      selectedMediaList.push(data.fileName);
      setSelectedPreview(selectedMediaList);
    }
    else {
      selectedMediaList = selectedMediaList.filter((item: any) => item.fileName === data.fileName);
      setSelectedPreview(selectedMediaList);
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

        { selectedPreview.includes(data.fileName) && 
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
      base64: true,
    });

    if (!result.canceled && result?.assets?.length) {
      let data = result.assets[0];
      let selectedMediaList = [...selectedMedia];
      let mediaExists = selectedMediaList.some(item => item.fileName === data.fileName);
      if (!mediaExists) {
        selectedMediaList.push(data);
        setSelectedMedia(selectedMediaList);
        setSelectedPreview([]);
    
        if (onSelectMedia) onSelectMedia(selectedMediaList);
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
          { selectedMedia.map((data: any) => renderImagePreview(data)) }
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
    //opacity: 0.5,
  },
  deleteMedia: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
});

export default MediaPickerBase;