import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from "@/constants/Colors";
import { Layout } from '@/constants/Layout';
import * as ImagePicker from 'expo-image-picker';
import ImageView from '../view/ImageView';
import IconView from '../view/IconView';
import MediaManager from '@/manager/MediaManager';
import DataManager from "@/manager/DataManager";
import SpinnerView from "../view/SpinnerView";
import InputTextField from "./InputTextField";

type Props = BaseProps & {
  title?: any;
  value?: any,
  preview?: boolean;
  placeholder?: any;
  onSelectItem?: (data: any) => void;
  onDeleteItem?: (data: any) => void;
};

const MediaPickerField = ({ title, value, preview, placeholder, onSelectItem, onDeleteItem}: Props) => {  
  const [selectedMedia, setSelectedMedia] = useState<any>([]);
  const [selectedPreview, setSelectedPreview] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const imageSize: any = MediaManager.getThumbnailSize();

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
          key={data.uri} 
          uri={data.uri} 
          width={imageSize.width} 
          height={imageSize.height} 
          resizeMode="cover" 
          style={imageStyle}
        />

        { isSelected && 
          <TouchableOpacity 
            style={styles.deleteMedia}
            onPress={() => deleteMedia(data)}
          >
            <IconView name="delete" theme="primary" size={12} padding={3.5} />
          </TouchableOpacity>
        } 
      </TouchableOpacity>
    );    
  };

  const launchBrowser = async () => {
    return await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
  };

  const pickImage = async () => {
    let result: any = await launchBrowser();

    if (!result.canceled && result?.assets?.length) {
      let mediaList: any = [...selectedMedia];
      for (const row of result?.assets) {
        let mediaExists: boolean = mediaList.some((item: any) => item.fileName === row.fileName);
        if (!mediaExists) mediaList.push(row);
      }

      setSelectedMedia(mediaList);
      setSelectedPreview([]);
      if (onSelectItem) onSelectItem(mediaList);
    }
  };

  const createMediaObject = async (media: any) => {
    let mediaUrl: any = MediaManager.getImageUrl(media?.url); 
    let base64 = await MediaManager.getImageBase64(mediaUrl);

    return {
      assetId: media?.id,
      fileName: mediaUrl,
      uri: mediaUrl,
      fileSize: null,
      height: imageSize.height,
      width: imageSize.width,
      mimeType: null,
      rotation: null,
      type: 'image',
      base64: base64,
      duration: null,
      exif: null,
    };
  }

  const getSelectedMedia = async () => {
    let mediaList: any = [...selectedMedia || []];

    for (const item of (value || [])) {
      let url: string = MediaManager.getImageUrl(item?.url);
      if (DataManager.isUrl(url)) {
        mediaList.push(await createMediaObject(item));
      }
    }

    return mediaList;
  }; 

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSelectedMedia(await getSelectedMedia());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);
  
  if (!isLoaded) return <SpinnerView size="small" />;

  return (
    <>
      {!selectedMedia?.length && (
        <TouchableOpacity onPress={pickImage}>
          <InputTextField
            value={value}
            readOnly={true}
            placeholder={placeholder}
            rightIcon={<IconView name="plus" theme="transparent" />}
          />
        </TouchableOpacity>
      )}

      { selectedMedia?.length > 0 && preview &&
        <View style={Layout.fieldSelectionPreview}>
          { selectedMedia.map((data: any) => {
            if (data?.uri) return renderImagePreview(data);
          })}

          <IconView name="plus" theme="transparent" onPress={pickImage} />
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  mediaPreview: {
    borderRadius: Layout.radius.round,
  },
  selectedPreview: {
    opacity: 0.7,
  },
  deleteMedia: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default MediaPickerField;