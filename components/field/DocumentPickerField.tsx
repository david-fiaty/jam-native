import { useState, useEffect, JSX } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import * as DocumentPicker from 'expo-document-picker';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';
import MediaManager from '@/manager/MediaManager';
import InputTextField from "./InputTextField";
import { isLoaded } from "expo-font";
import TagView from "../view/TagView";
import DataManager from "@/manager/DataManager";

type Props = {
  value?: any;
  placeholder?: string;
  preview?: boolean;
  multiple?: boolean;
  mediaTypes?: any;
  onSelectItem?: (data: any) => void;
  onDeleteItem?: (data: any) => void;
};

const DocumentPickerField = ({ value, placeholder, preview, multiple, mediaTypes, onSelectItem, onDeleteItem }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedDocuments, setSelectedDocuments] = useState<any>([]);
  const [selectedPreview, setSelectedPreview] = useState<any>([]);
  const imageSize: any = MediaManager.getThumbnailSize();

  const deleteMedia = (data: any) => {
    let mediaList = [...selectedDocuments];
    mediaList = mediaList.filter((item: any) => item.name !== data.name);
    setSelectedDocuments(mediaList);
    if (onDeleteItem) onDeleteItem(mediaList);
  };

  const updatePreviewSelection = (data: any) => {
    let mediaList = [...selectedPreview];
    if (!selectedPreview.includes(data.name)) {
      mediaList.push(data.name);
      setSelectedPreview(mediaList);
    }
    else {
      mediaList = mediaList.filter((item: any) => item.name === data.name);
      setSelectedPreview(mediaList);
    }
  };

  const renderDocumentPreview = (data: any) => {
    return (
      <TouchableOpacity
        key={data.uri}
        onPress={() => updatePreviewSelection(data)}
      >
        <TagView
          key={data.name}
          theme="white"
          canEdit={true}
          containerStyle={styles.tagItem}
          onDeleteButtonPress={() => deleteMedia(data)}
        >
          {DataManager.truncateText(data.name, 18)}
        </TagView>
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
        let mediaExists: boolean = mediaList.some((item: any) => item.name === row.name);
        if (!mediaExists) mediaList.push(row);
      }

      setSelectedDocuments(mediaList);
      setSelectedPreview([]);
      if (onSelectItem) onSelectItem(mediaList);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      setSelectedDocuments(value || []);
      setIsLoaded(true);
    }
  }, [value]);

  return (
    <View style={styles.container}>
      {!selectedDocuments?.length && (
        <TouchableOpacity onPress={pickDocument}>
          <InputTextField
            readOnly={true}
            placeholder={placeholder}
            rightIcon={<IconView name="document" theme="transparent" />}
          />
        </TouchableOpacity>
      )}

      {selectedDocuments?.length > 0 && preview &&
        <View style={Layout.fieldSelectionPreview}>
          {selectedDocuments.map((data: any) => {
            if (data?.uri) return renderDocumentPreview(data);
          })}

          <IconView name="plus" theme="transparent" onPress={pickDocument} />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  previewContainer: {
    paddingVertical: Layout.space.base,
    gap: Layout.space.base * 1,
    backgroundColor: 'gray',
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
  tagItem: {
    marginRight: Layout.space.base,
    marginBottom: Layout.space.base,
  },
});

export default DocumentPickerField;