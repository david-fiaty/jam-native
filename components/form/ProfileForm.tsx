import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import ProfileManager from "@/manager/ProfileManager";
import ProfileTypeField from "../field/ProfileTypeField";
import ProfileImageField from "../field/ProfileImageField";
import ButtonView from "../view/ButtonView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import ScreenManager from "@/manager/ScreenManager";
import SpinnerView from "../view/SpinnerView";

type Props = {
  resource?: any;
};

const ProfileForm = ({ resource }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
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
 
  const canRenderForm = () => {
    return formData?.profile_type?.length > 0
      || resource == 'profile';
  }

  const getSubmitLabel = () => {
    return resource == 'profile' ? i18n.t('Update') : i18n.t('Continue');
  };

  const submitForm = async () => {
    setIsProcessing(true);

    if (resource == 'signup') await submitSignupForm();
    else if (resource == 'profile') await submitProfileForm();

    setIsProcessing(false);
  };

  const submitProfileForm = async () => {
    let result: any = await UserManager.updateProfile(formData);

    if (result?.error) {
      ScreenManager.showMessage({
        title: i18n.t('Profile update'),
        //content: result.error, // Todo - Implement field error management
        content: i18n.t('There was an error with the submission. Please check your data and try again.'),
      });
    }
    else {
      ScreenManager.showMessage({
        title: i18n.t('Profile update'),
        content: i18n.t('The profile data was successfully updated.'),
      });
    }
  };

  const submitSignupForm = async () => {
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

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileId(await UserManager.getProfileId());

        if (resource == 'profile') {
          dispatch(setFormData<any>({ 
            resource: resource,
            key: null, 
            value: await UserManager.getProfileData(), 
          }));
        }
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, formData, resource]);

  if (!isLoaded) return <SpinnerView />;

  console.log(formData);
  
  return (
    <View style={[Layout.formContainer, styles.container]}>
      {resource == 'signup' && (
        <>
          <ProfileImageField
            value={formData?.upload_profile_picture?.url}
            onChangeValue={(mediaList: any) => updateField('upload_profile_picture', { url: mediaList[0]?.uri })}
          />

          <ProfileTypeField
            value={formData?.profile_type}
            onChangeValue={(option: any) =>
              updateField("profile_type", option.value)
            }
          />
        </>
      )}

      {canRenderForm() === true && profileFields.map((item: any) => {
        if (ProfileManager.canRenderField(resource, item, formData)) {
          return (
            <View key={item.key} style={styles.fieldContainer}>
              {ProfileManager.renderField(resource, item, formData)}
            </View>
          );
        }
      })}

      <View style={styles.submitButtonContainer}>
        <ButtonView
          label={getSubmitLabel()}
          isProcessing={isProcessing}
          onPress={submitForm}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Layout.space.base,
    paddingBottom: Layout.space.base * 2,
    width: '100%',
  },
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
