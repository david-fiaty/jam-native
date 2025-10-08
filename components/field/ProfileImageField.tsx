import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
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
  
  const onSelectItem = (mediaList: any) => {
    setUri(mediaList[0]?.uri);
    if (onChangeValue) onChangeValue(mediaList);
  };

  const deleteImage = () => {
    // Todo - Implement delete action
    console.log('delete image')
  };

  useEffect(() => {
    if (!isLoaded) {
      setUri(value || '');
      setIsLoaded(true);
    }
  }, [value, isLoaded]);
  
  return (
    <MediaPickerField
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
                uri={MediaManager.getImageUrl(uri)}
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
