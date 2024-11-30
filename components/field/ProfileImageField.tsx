import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import MediaPickerBase from "../base/MediaPickerBase";
import ImageView from "../view/ImageView";
import IconView from "../view/IconView";

type Props = BaseProps & {
  value?: any;
  storage?: any,
  onChangeValue?: (data: any) => void;
};

const ProfileImageField = ({value, storage, onChangeValue }: Props) => {
  let profileData: any = [];
  const [uri, setUri] = useState<any>('');

  if (!uri && value?.length > 0) {
    setUri(Config.imageUrl + value);
  }
  
  const onSelectItem = (mediaList: any) => {
    setUri(mediaList[0]?.uri);
    if (onChangeValue) onChangeValue(mediaList);
  };

  return (
    <MediaPickerBase
      label={
        <BoxView direction="row" align="center" style={styles.container}>
          {!uri?.length && (
            <BoxView direction="row" align="center" justify="space-between">
              <IconView name="user" theme="primary" size={60} radius="circle" />
              <TextView>{i18n.t("Add a profile image.")}</TextView>
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
          <View>
            <IconView name="next" theme="clear" size={20} />
          </View>
        </BoxView>
      }
      onSelectItem={onSelectItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  imagePreview: {
    borderRadius: Layout.radius.round,
  }
});

export default ProfileImageField;
