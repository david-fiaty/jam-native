import { StyleSheet } from "react-native";
import { BaseProps } from '@/constants/Types';
import MediaPickerBase from "../base/MediaPickerBase";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import IconView from "../view/IconView";

type Props = BaseProps & {
  onSelectMedia?: (data: any) => void,
};

const AddMediaField = ({onSelectMedia}: Props) => {
  return (
    <MediaPickerBase
      onSelectMedia={onSelectMedia}
      label={
        <BoxView direction="row" align="center" style={styles.container}>
          <IconView name="plus" theme="secondary" radius="round" />
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
