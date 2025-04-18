import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import ProfileManager from "@/manager/ProfileManager";
import ProfileTypeField from "../field/ProfileTypeField";
import ProfileImageField from "../field/ProfileImageField";
import ButtonView from "../view/ButtonView";
import i18n from "@/translation/i18n";
import DataManager from "@/manager/DataManager";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from "@/manager/EntityManager";

const resource: string = 'profile';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const formData = useSelector((state: any) => state.form?.[resource]);
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

    //let media: any = MediaManager.prepareUpload(formData?.[mediasFieldName]);
    // Todo - Find profile media field

    let result: any = await EntityManager.updateProfile(formData);
    let message: any = {
      title: i18n.t('Update profile'),
      content: i18n.t('The profile data was successfully updated.'),
    };

    if (result?.error) message.content = i18n.t(result.error);
    ScreenManager.showMessage(message);
    setIsProcessing(false);
  };

  return (
    <View style={[Layout.formContainer, styles.container]}>
      <ProfileImageField
        value={formData?.profile_picture?.url}
        onChangeValue={(mediaList: any) => updateField('profile_picture', { url: mediaList[0]?.uri })}
      />

      <ProfileTypeField
        value={formData?.profile_type}
        onChangeValue={(option: any) => updateField('profile_type', option.value)}
      />

      {formData?.profile_type?.length > 0 && profileFields.map((item: any) => {
        if (ProfileManager.canRenderField('signup', item, formData)) {
          return (
            <View key={DataManager.createUuid()}>
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
    //height: '100%', // Todo - Improve container scroll display
  },
});

export default ProfileForm;
