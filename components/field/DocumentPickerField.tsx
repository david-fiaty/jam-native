import { useState, useEffect, JSX } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import ImageView from '../view/ImageView';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';
import MediaManager from '@/manager/MediaManager';
import InputTextField from "./InputTextField";

type Props = {
  label?: JSX.Element;
  value?: any;
  placeholder?: string;
  preview?: boolean;
  multiple?: boolean;
  mediaTypes?: any;
  onSelectItem?: (data: any) => void;
  onDeleteItem?: (data: any) => void;
};

const DocumentPickerField = ({ label, value, placeholder, preview, multiple, mediaTypes, onSelectItem, onDeleteItem }: Props) => {
  const [selectedDocuments, setSelectedDocuments] = useState<any>([]);
  const [selectedPreview, setSelectedPreview] = useState<any>([]);
  const imageSize: any = MediaManager.getThumbnailSize();

  const deleteMedia = (data: any) => {
    let mediaList = [...selectedDocuments];
    mediaList = mediaList.filter((item: any) => item.fileName !== data.fileName);
    setSelectedDocuments(mediaList);
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

  const renderDocumentPreview = (data: any) => {
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
    return await DocumentPicker.getDocumentAsync({
      type: '*/*', 
      copyToCacheDirectory: true,
      multiple: (multiple === true ? true : false),
    });
  };

  const pickDocument = async () => {
    let result: any = await launchBrowser();

    if (!result.canceled && result?.assets?.length) {
      let mediaList: any = [...selectedDocuments];
      for (const row of result?.assets) {
        let mediaExists: boolean = mediaList.some((item: any) => item.fileName === row.fileName);
        if (!mediaExists) mediaList.push(row);
      }

      setSelectedDocuments(mediaList);
      setSelectedPreview([]);
      if (onSelectItem) onSelectItem(mediaList);
    }
  };

  useEffect(() => {
    setSelectedDocuments(value || []);
  }, [value]);

  return (
    <View style={styles.container}>
      {label && (
        <TouchableOpacity onPress={pickDocument}>
          <TextView>{label}</TextView>
        </TouchableOpacity>
      )}

      {!label && (
        <TouchableOpacity onPress={pickDocument}>
          <InputTextField
            readOnly={true}
            placeholder={placeholder}
            rightIcon={<IconView name="document" theme="transparent" />}
          />
        </TouchableOpacity>
      )}

      {selectedDocuments?.length > 0 && preview &&
        <BoxView direction="row" align="flex-start" justify="left" style={styles.previewContainer}>
          {selectedDocuments.map((data: any) => {
            if (data?.uri) return renderDocumentPreview(data);
          })}
        </BoxView>
      }
    </View>
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

export default DocumentPickerField;