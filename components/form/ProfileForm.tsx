import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { setFormData } from "@/redux/slices/FormSlice";
import ProfileImageField from "@/components/field/ProfileImageField";
import ButtonView from "@/components/view/ButtonView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import ScreenManager from "@/manager/ScreenManager";
import FormManager from "@/manager/FormManager";
import ProfileFormPersonal from "./profile-form/ProfileFormPersonal";
import ProfileFormOrganization from "./profile-form/ProfileFormOrganization";
import ProfileFormVenue from "./profile-form/ProfileFormVenue";
import ProfileFormAll from "./profile-form/ProfileFormAll";
import SelectListField from "../field/SelectListField";
import EntityManager from "@/manager/EntityManager";
import ContentManager from "@/manager/ContentManager";

type Props = {
  resource?: any;
  onSubmit?: () => void;
};

const ProfileForm = ({ resource, onSubmit }: Props) => {
  resource = resource || 'profile';

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const formData = useSelector((state: any) => state.form?.[resource]);
  const userState = useSelector((state: any) => state.user);

  const submitForm = async () => {

    return;

    /*
    setIsProcessing(true);

    if (onSubmit) {
      onSubmit();
    }
    else {

      let data: any = { ...formData };

      delete data.profile_picture;
      if (data.hasOwnProperty('upload_profile_picture') && data.upload_profile_picture === null) {
        delete data.upload_profile_picture;
      }

      let result: any = await UserManager.updateProfile(data);

      if (result?.success === false) {
        FormManager.addServerErrors(resource, result?.data?.meta);

        ScreenManager.showMessage({
          title: i18n.t('Profile update'),
          content: i18n.t('Invalid data submission.'),
        });

        setIsProcessing(false);
      }
      else {
        FormManager.clearErrors(resource);

        ScreenManager.showMessage({
          title: i18n.t('Profile update'),
          content: i18n.t('The profile data was successfully updated.'),
        });
      }
    }

    setIsProcessing(false);
    */
  };

  const loadFormData = async () => {
    let data: any = { ...userState.profileData || {} };
    let profileId: any = userState.profileData?.id || 0;

    data = {
      ...data,
      ...{
        profile_id: profileId,
        scope_country_code: data?.country || '',
        sectors_ids: data?.sectors || [],
        professions_ids: data?.professions || [],
        upload_profile_picture: null,
      },
      ...(formData || {}),
    };

    delete data.country;
    delete data.sectors;
    delete data.professions;

    dispatch(setFormData<any>({
      resource: resource,
      key: null,
      value: data,
    }));
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        await loadFormData();
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  return (
    <View style={Layout.formContainer}>
      <ProfileImageField
        resource={resource}
        fieldKey="upload_profile_picture"
        rules={['required']}
        label={i18n.t('Profile Image')}
        value={formData?.profile_picture?.url || ''}
      />

      <SelectListField
        resource={resource}
        fieldKey="profile_type"
        rules={['required']}
        value={formData?.profile_type || ''}
        label={i18n.t('Profile type')}
        placeholder={i18n.t('Select a profile type')}
        optionLabelKey="label"
        optionValueKey="id"
        data={ContentManager.getProfileTypes()}
        //disabled={resource == 'profile'}
      />

      {/* All profiles */}
      {formData?.profile_type?.length && (
        <ProfileFormAll resource={resource} formData={formData} />
      )}

      {/* Personal profile */}
      {formData?.profile_type == 'personal' && (
        <ProfileFormPersonal resource={resource} formData={formData} />
      )}

      {/* Organization profile */}
      {formData?.profile_type == 'organization' && (
        <ProfileFormOrganization resource={resource} formData={formData} />
      )}

      {/* Venue profile */}
      {formData?.profile_type == 'venue' && (
        <ProfileFormVenue resource={resource} formData={formData} />
      )}

      {/* Submit button */}
      <View style={styles.submitButtonContainer}>
        <ButtonView
          label={i18n.t('Submit')}
          isProcessing={isProcessing}
          onPress={submitForm}
          disabled={!formData?.profile_type?.length}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  submitButtonContainer: {
    marginTop: Layout.space.base,
  },
  fieldContainer: {
    width: '100%',
    maxWidth: '100%',
    flexShrink: 1,
  },
});

export default ProfileForm;