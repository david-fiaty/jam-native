import { StyleSheet } from "react-native";
import MediaPickerBase from "../base/MediaPickerBase";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import IconView from "../view/IconView";

type ImagePreviewProps = {
  selectedImage?: string;
};

const AddMediaField = () => {
  return (
    <MediaPickerBase
      label={
        <BoxView direction="row" align="center" style={styles.container}>
          <IconView name="plus" theme="secondary" size={22} radius="round" />
          <TextView>{i18n.t('Add media')}</TextView>
        </BoxView>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default AddMediaField;
