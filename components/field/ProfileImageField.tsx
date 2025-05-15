import { useState } from 'react';
import { StyleSheet } from "react-native";
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
  let profileData: any = [];
  const [uri, setUri] = useState<any>('');

  if (!uri && value?.length > 0) {
    setUri(MediaManager.getImageUrl(value));
  }

  const onSelectItem = (mediaList: any) => {
    setUri(mediaList[0]?.uri);
    if (onChangeValue) onChangeValue(mediaList);
  };

  return (
    <MediaPickerField
      label={
        <BoxView direction="row" align="center" style={styles.container}>
          {!uri?.length && (
            <BoxView direction="column" align="center" justify="center" style={styles.iconContainer}>
              <TextView>{i18n.t("Add a profile image")}</TextView>  
              <IconView name="upload" theme="secondary" size={26} padding={18} radius="circle" />
            </BoxView>
          )}

          {uri?.length > 0 && (
            <BoxView
              direction="row"
              align="center"
              justify="space-between"
              style={styles.container}
            >
              <ImageView
                uri={uri}
                width={132}
                height={132}
                resizeMode="cover"
                style={styles.imagePreview}
              />
              <TextView>{i18n.t("Change your profile image.")}</TextView>
            </BoxView>
          )}
        </BoxView>
      }
      onSelectItem={onSelectItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  iconContainer: {
    width: '100%',
  },
  imagePreview: {
    borderRadius: Layout.radius.round,
  }
});

export default ProfileImageField;
