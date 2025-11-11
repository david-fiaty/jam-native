import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import * as ImagePicker from 'expo-image-picker';
import ImageView from '../view/ImageView';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';
import FormManager from "@/manager/FormManager";
import MediaManager from "@/manager/MediaManager";

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  label?: any;
  value?: any;
  mediaTypes?: any;
  onSelectItem?: (data: any) => void;
  onDeleteItem?: (data: any) => void;
};

const ProfileImageField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  label,
  value,
  mediaTypes,
  onSelectItem,
  onDeleteItem
}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [currentImageExists, setCurrentImageExists] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<any>([]);
  const [selectedPreview, setSelectedPreview] = useState<any>([]);
  const imageSize: any = MediaManager.getThumbnailSize();

  const deleteMedia = (uri: string) => {
    let mediaList: any[] = [];
    
    setSelectedMedia(mediaList);

    if (onDeleteItem) {
      onDeleteItem(mediaList);
    }
    else {
      FormManager.updateField(resource, fieldKey, mediaList, rules, parentKey);
    }
  };

  const togglePreviewSelection = (uri: string) => {
    if (selectedPreview.includes(uri)) {
      setSelectedPreview([]);
    }
    else {
      setSelectedPreview([uri]);
    }
  };

  const isImagePreviewSelected = (uri: string) => {
    return selectedPreview.includes(uri);
  };

  const getImagePreviewStyles = (isSelected: boolean) => {
    return {
      ...styles.mediaPreview,
      ...isSelected ? styles.selectedPreview : {},
    };
  };

  const getImageUrl = (uri: any) => {
    if (!uri) return '';

    if (uri.startsWith('file://')) {
      return uri;
    }
    else {
      return MediaManager.getImageUrl(uri);
    }
  };

  const renderImagePreview = (uri: string) => {
    const isSelected: boolean = isImagePreviewSelected(uri);
    const imageStyle: any = getImagePreviewStyles(isSelected);

    return (
      <TouchableOpacity
        key={uri}
        onPress={() => togglePreviewSelection(uri)}
      >
        <ImageView
          key={uri}
          uri={uri}
          width={imageSize.width}
          height={imageSize.height}
          resizeMode="cover"
          style={imageStyle}
        />

        {isSelected &&
          <TouchableOpacity
            style={styles.deleteMedia}
            onPress={() => deleteMedia(uri)}
          >
            <IconView name="delete" theme="primary" size={12} padding={3.5} />
          </TouchableOpacity>
        }
      </TouchableOpacity>
    );
  };

  const launchBrowser = async () => {
    return await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaTypes || [],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      allowsMultipleSelection: false,
    });
  };

  const pickImage = async () => {
    let result: any = await launchBrowser();

    if (!result.canceled && result?.assets?.length) {
      let mediaList: any = [result.assets[0]];

      setSelectedMedia(mediaList);
      setSelectedPreview([]);

      if (onSelectItem) {
        onSelectItem(mediaList);
      }
      else {
        FormManager.updateField(resource, fieldKey, mediaList, rules, parentKey);
      }
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      (async () => {
        let imageUrl: any = getImageUrl(value);
        setCurrentImageUrl(imageUrl);
        setCurrentImageExists(await MediaManager.imageExists(imageUrl));
      })();

      setIsLoaded(true);
    }
  }, [isLoaded, value]);

  return (
    <>
      {FormManager.renderLabel(label, rules)}

      <BoxView direction="row" align="center">
        {!selectedMedia?.length && !currentImageExists && (
          <TouchableOpacity onPress={pickImage}>
            <BoxView 
              direction="row" 
              align="center" 
              justify="flex-start" 
              style={[styles.iconContainer, { width: imageSize.width, height: imageSize.height}]}
            >
              <IconView 
                name="image" 
                theme="secondary" 
                size={22} 
                padding={40} 
                radius="round" 
              />
            </BoxView>
          </TouchableOpacity>
        )}

        {selectedMedia?.length > 0 && (
          <BoxView 
            direction="row" 
            align="flex-start" 
            justify="left" 
          >
            {renderImagePreview(selectedMedia[0].uri)}
          </BoxView>
        )}

        {!selectedMedia?.length && currentImageExists && (
          <BoxView 
            direction="row" 
            align="flex-start" 
            justify="left" 
          >
            {renderImagePreview(currentImageUrl)}
          </BoxView>
        )}
      </BoxView>

      {FormManager.renderError(fieldKey, parentKey)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  iconContainer: {
    width: '100%',
  },
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

export default ProfileImageField;