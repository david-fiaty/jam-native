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
  onChangeValue?: (option: any) => void;
};

const ProfileImageField = ({ value, onChangeValue }: Props) => {
  let profileData: any = [];

  return (
    <MediaPickerBase
      label={
        <BoxView direction="row" align="center" style={styles.container}>
          {!profileData?.profile_picture?.url?.length && (
            <BoxView direction="row" align="center" justify="space-between">
              <IconView name="user" theme="primary" size={60} radius="circle" />
              <TextView>{i18n.t("Add a profile image.")}</TextView>
            </BoxView>
          )}

          {profileData?.profile_picture?.url?.length > 0 && (
            <BoxView
              direction="row"
              align="center"
              justify="space-between"
              style={styles.container}
            >
              <ImageView
                uri={Config.imageUrl + profileData?.profile_picture?.url}
                width={96.7}
                height={96.7}
                resizeMode="cover"
              />
              <TextView>{i18n.t("Change your profile image.")}</TextView>
            </BoxView>
          )}
          <View>
            <IconView name="next" theme="clear" size={20} />
          </View>
        </BoxView>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.space.base,
  },
});
export default ProfileImageField;
