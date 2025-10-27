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
import SpinnerView from "@/components/view/SpinnerView";
import TextView from "@/components/view/TextView";
import ProfileTypeField from "@/components/field/ProfileTypeField";
import FormManager from "@/manager/FormManager";
import BoxView from "@/components/view/BoxView";
import ProfileFormPersonal from "./profile-form/ProfileFormPersonal";
import ProfileFormOrganization from "./profile-form/ProfileFormOrganization";
import ProfileFormVenue from "./profile-form/ProfileFormVenue";
import ProfileFormAll from "./profile-form/ProfileFormAll";

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
  };

  const loadFormData = async () => {
    let data: any = { ...userState.profileData };
    let profileId: any = userState.profileData.id;

    data = {
      ...data,
      ...{
        profile_id: profileId,
        scope_country_code: userState.profileData?.country || '',
        sectors_ids: userState.profileData?.sectors || [],
        professions_ids: userState.profileData?.professions || [],
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

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={[Layout.formContainer, styles.container]}
    >
      <BoxView direction="column" style={[Layout.formContainer, styles.formContainer]}>
        <TextView>{i18n.t('Profile Image')}</TextView>
        <ProfileImageField
          value={formData?.profile_picture?.url}
          onChangeValue={(data: any) => FormManager.updateField(resource, 'upload_profile_picture', data)}
        />
        {FormManager.renderError('upload_profile_picture')}

        <TextView>{i18n.t('Profile type')}*</TextView>
        <ProfileTypeField
          value={formData?.profile_type}
          onChangeValue={(option: any) => FormManager.updateField(resource, 'profile_type', option.value, ['string'])}
        //disabled={resource == 'profile'}
        />
        {FormManager.renderError('profile_type')}

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

        {/* All profiles */}
        {formData?.profile_type?.length && (
          <>
            <TextView style={styles.groupTitle}>
              {i18n.t("Profile details")}
            </TextView>

            <ProfileFormAll resource={resource} formData={formData} />
          </>
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
      </BoxView>
    </BoxView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingBottom: Layout.space.base * 3,
  },
  formContainer: {
    maxWidth: '100%',
    flexShrink: 1,
    paddingTop: Layout.space.base,
  },
  submitButtonContainer: {
    marginTop: Layout.space.base,
  },
  fieldContainer: {
    width: '100%',
    maxWidth: '100%',
    flexShrink: 1,
  },
  groupTitle: {
    fontWeight: 'bold',
    marginTop: Layout.space.base * 1.5,
  },
});

export default ProfileForm;