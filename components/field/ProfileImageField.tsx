import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Config } from "@/constants/Config";
import { Layout } from "@/constants/Layout";
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import MediaPickerBase from "../base/MediaPickerBase";
import TextView from "../view/TextView";
import ImageView from '../view/ImageView';
import IconView from '../view/IconView';

type Props = BaseProps & {
  url?: any,
};

const ProfileImageField = ({url}: Props) => {
  return (
    <MediaPickerBase
      label={
        <BoxView direction="row" align="center" style={styles.profileImageContainer}>
          { !url?.length && 
            <BoxView direction="row" align="center" justify="space-between">
              <IconView name="user" theme="primary" size={60} radius="circle" />
              <TextView>{i18n.t('Change your Jammer user profile image.')}</TextView>
              <IconView name="next" theme="clear" size={60} />
            </BoxView>
          } 

          { url?.length > 0 && 
            <BoxView direction="row" align="center" justify="space-between" style={styles.profileImageContainer}>
              <ImageView 
                uri={Config.imageUrl + url} 
                width={96.7}
                height={96.7}
                resizeMode="cover"
              />
              <TextView>{i18n.t('Upload your Jammer user profile image.')}</TextView>
              <IconView name="next" theme="clear" size={60} />
            </BoxView>
          } 

        </BoxView>
      }
    />
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    paddingHorizontal: Layout.space.base,
    width: 200,
  },
});

export default ProfileImageField;