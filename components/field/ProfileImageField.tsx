import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import * as ImagePicker from 'expo-image-picker';
import ImageView from '../view/ImageView';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';
import MediaManager from '@/manager/MediaManager';
import InputTextField from "./InputTextField";
import FormManager from "@/manager/FormManager";

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  label?: any;
  value?: any;
  placeholder?: string;
  preview?: boolean;
  multiple?: any;
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
  placeholder,
  preview,
  multiple,
  mediaTypes,
  onSelectItem,
  onDeleteItem
}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<any>([]);
  const [selectedPreview, setSelectedPreview] = useState<any>([]);
  const imageSize: any = MediaManager.getThumbnailSize();

  const deleteMedia = (data: any) => {
    let mediaList: any[] = [];
    setSelectedMedia(mediaList);

    if (onDeleteItem) {
      onDeleteItem(mediaList);
    }
    else {
      FormManager.updateField(resource, fieldKey, mediaList, rules, parentKey);
    }
  };

  const updatePreviewSelection = (data: any) => {
    setSelectedPreview([data.fileName]);
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

        {isSelected &&
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
      mediaTypes: mediaTypes || [],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      allowsMultipleSelection: (multiple === true ? true : false),
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
      setSelectedMedia(value ? [value] : []);
      setIsLoaded(true);
    }
  }, [isLoaded, value]);

  return (
    <>
      {FormManager.renderLabel(label, rules)}
      
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <InputTextField
            readOnly={true}
            placeholder={placeholder}
            rightIcon={<IconView name="image" theme="transparent" />}
          />
        </TouchableOpacity>

        {selectedMedia?.length > 0 && preview &&
          <BoxView direction="row" align="flex-start" justify="left" style={styles.previewContainer}>
            {selectedMedia.map((data: any) => {
              if (data?.uri) return renderImagePreview(data);
            })}
          </BoxView>
        }
      </View>

      {FormManager.renderError(fieldKey, parentKey)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  previewContainer: {
    paddingVertical: Layout.space.base,
    gap: Layout.space.base * 1,
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