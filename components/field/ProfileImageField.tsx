import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import MediaPickerField from './MediaPickerField';
import ImageView from "../view/ImageView";
import IconView from "../view/IconView";
import MediaManager from '@/manager/MediaManager';

type Props = {
  value?: any;
  storage?: any,
  onChangeValue?: (data: any) => void;
};

const ProfileImageField = ({ value, storage, onChangeValue }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [uri, setUri] = useState<any>('');

  const getImageUrl = (uri: any) => {
    if (uri.startsWith('file://')) {
      return uri;
    }
    else {
      return MediaManager.getImageUrl(uri);
    }
  };

  const onSelectItem = (data: any) => {
    let uri: string = getImageUrl(data[0].uri);
    setUri(uri);
    if (onChangeValue) onChangeValue(data);
  };

  const deleteImage = () => {
    setUri('');
  };

  useEffect(() => {
    if (!isLoaded) {
      setUri(value ? getImageUrl(value) : '');
      setIsLoaded(true);
    }
  }, [value, isLoaded]);

  return (
    <MediaPickerField
      mediaTypes={['images']}
      label={
        <BoxView direction="row" align="center">
          {!uri?.length && (
            <BoxView direction="row" align="center" justify="flex-start" style={styles.iconContainer}>
              <IconView name="image" theme="secondary" size={26} padding={48} radius="round" />
            </BoxView>
          )}

          {uri?.length > 0 && (
            <BoxView
              direction="row"
              align="center"
              justify="space-between"
            >
              <ImageView
                uri={uri}
                width={132}
                height={132}
                resizeMode="cover"
                style={styles.imagePreview}
              />

              <TouchableOpacity
                style={styles.deleteImage}
                onPress={deleteImage}
              >
                <IconView name="delete" theme="primary" size={12} padding={3.5} />
              </TouchableOpacity>
            </BoxView>
          )}
        </BoxView>
      }
      onSelectItem={onSelectItem}
    />
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: '100%',
  },
  imagePreview: {
    borderRadius: Layout.radius.round,
  },
  deleteImage: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default ProfileImageField;
