import { StyleSheet } from "react-native";
import MediaPickerBase from "../base/MediaPickerBase";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import IconView from "../view/IconView";
import { Layout } from "@/constants/Layout";

type ImagePreviewProps = {
  selectedImage?: string;
};

const UserProfileImageField = () => {
  return (
    <MediaPickerBase
      label={
        <BoxView direction="row" align="center" justify="space-between" style={styles.container}>
          <IconView name="user" theme="primary" size={60} radius="circle" />
          <TextView style={styles.text}>{i18n.t('Upload your Jammer user profile image.')}</TextView>
          <IconView name="next" theme="clear" size={60} />
        </BoxView>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    width: '50%',
    paddingHorizontal: Layout.space.base,
    backgroundColor: 'red',
  },
});

export default UserProfileImageField;
