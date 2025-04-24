import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Config } from "@/constants/Config";
import ProfileManager from "@/manager/ProfileManager";
import ProfileTypeField from "../field/ProfileTypeField";
import ProfileImageField from "../field/ProfileImageField";
import ButtonView from "../view/ButtonView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import ScreenManager from "@/manager/ScreenManager";
import { Layout } from "@/constants/Layout";

const resource: string = 'profile';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const formData = useSelector((state: any) => state.form?.[resource]);
  const signupData: any = useSelector((state: any) => state.signup);
  const profileFields: any = ProfileManager.getFields();

  const updateField = (key: string, value: any) => {
    dispatch(setFormData<any>({
      resource: resource,
      key: key,
      value: value,
    }));
  };

  const submitForm = async () => {
    setIsProcessing(true);

    let { password, ...profileData } = formData;

    let payload: any = {
      ...{ profile: profileData },
      ...{
        email: signupData.email,
        session: signupData.session,
        password: password,
      },
    };

    let result: any = await UserManager.register(payload);
    setIsProcessing(false);

    if (result.success === false) {
      ScreenManager.showMessage({
        title: i18n.t('User registration'),
        //content: result.error, // Todo - Implement field error management
        content: i18n.t('There was an error with the submission. Please check your data and try again.'),
      });
    }
    else {
      router.replace(Config.mainRoute);
    }
  };

  return (
    <View style={[Layout.formContainer, styles.container]}>
      <ProfileImageField
        value={formData?.upload_profile_picture?.url}
        onChangeValue={(mediaList: any) => updateField('upload_profile_picture', { url: mediaList[0]?.uri })}
      />

      <ProfileTypeField
        value={formData?.profile_type}
        onChangeValue={(option: any) => updateField('profile_type', option.value)}
      />

      {formData?.profile_type?.length > 0 && profileFields.map((item: any) => {
        if (ProfileManager.canRenderField('signup', item, formData)) {
          return (
            <View key={item.key} style={styles.fieldContainer}>
              {ProfileManager.renderField('signup', item, formData)}
            </View>
          );
        }
      })}

      <ButtonView
        label={i18n.t('Continue')}
        isProcessing={isProcessing}
        onPress={submitForm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Layout.space.base,
    paddingBottom: Layout.space.base*2,
  },
  fieldContainer: {
    maxWidth: '100%', 
    flexShrink: 1,
  },
});

export default ProfileForm;
