import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import ProfileTypeField from "../field/ProfileTypeField";
import ProfileImageField from "../field/ProfileImageField";
import ButtonView from "../view/ButtonView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import ScreenManager from "@/manager/ScreenManager";
import SpinnerView from "../view/SpinnerView";
import TextView from "../view/TextView";
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import CountryField from "../field/CountryField";
import SectorsField from "../field/SectorsField";
import ModalManager from "@/manager/ModalManager";
import LocationPickerField from "../field/LocationPickerField";

const resource: string = 'signup';

const SignupForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const formData = useSelector((state: any) => state.form?.[resource]);
  const signupData: any = useSelector((state: any) => state.signup);

  const updateField = (key: string, value: any) => {
    dispatch(setFormData<any>({
      resource: resource,
      key: key,
      value: value,
    }));
  };

  const submitForm = async () => {
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

    setIsProcessing(false);
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, formData]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={[Layout.formContainer, styles.container]}>
      
      <ProfileImageField
        value={formData?.upload_profile_picture?.url}
        onChangeValue={(mediaList: any) => updateField('upload_profile_picture', { url: mediaList[0]?.uri })}
      />

      <TextView>{i18n.t('Profile type')}*</TextView>
      <ProfileTypeField
        value={formData?.profile_type}
        onChangeValue={(option: any) => updateField('profile_type', option.value)}
      />  

      {/* Personal profile */}
      {formData?.profile_type == 'personal' && (
        <>
          <TextView>
            {i18n.t('First name')}*
          </TextView>
          <InputTextField
            value={formData?.profile_personal?.first_name}
            placeholder={i18n.t('Enter your first name')}
            onChangeText={(value: string) => updateField('profile_personal', {
              ...(formData?.profile_personal || {}),
              ...{ first_name: value },
            })}
          />

          <TextView>
            {i18n.t('Last name')}
          </TextView>
          <InputTextField
            value={formData?.profile_personal?.last_name}
            placeholder={i18n.t('Enter your last name')}
            onChangeText={(value: string) => updateField('profile_personal', {
              ...(formData?.profile_personal || {}),
              ...{ last_name: value },
            })}
          />
        </>
      )}

      {/* Organization profile */}
      {formData?.profile_type == 'organization' && (
        <>
          <TextView>
            {i18n.t('Organization name')}*
          </TextView>
          <InputTextField
            value={formData?.profile_organization?.organization_name}
            placeholder={i18n.t('Enter your organization name')}
            onChangeText={(value: string) => updateField('profile_organization', {
              ...(formData?.profile_organization || {}),
              ...{ organization_name: value },
            })}
          />

          <TextView>
            {i18n.t('Creation year')}
          </TextView>
          <InputTextField
            keyboardType="number-pad"
            value={formData?.profile_organization?.creation_year}
            placeholder={i18n.t('Enter the creation year')}
            onChangeText={(value: string) => updateField('profile_organization', {
              ...(formData?.profile_organization || {}),
              ...{ creation_year: value },
            })}
          />
        </>
      )}

      {/* Venue profile */}
      {formData?.profile_type == 'venue' && (
        <>
          <TextView>
            {i18n.t('Venue name')}*
          </TextView>
          <InputTextField
            value={formData?.profile_venue?.venue_name}
            placeholder={i18n.t('Enter the venue name')}
            onChangeText={(value: string) => updateField('profile_venue', {
              ...(formData?.profile_venue || {}),
              ...{ venue_name: value },
            })}
          />

          <TextView>
            {i18n.t('Creation year')}
          </TextView>
          <InputTextField
            value={formData?.profile_venue?.creation_year}
            placeholder={i18n.t('Enter the creation year')}
            onChangeText={(value: string) => updateField('profile_venue', {
              ...(formData?.profile_venue || {}),
              ...{ creation_year: value },
            })}
          />
        </>
      )}

      {/* All profiles */}
      {formData?.profile_type?.length && (
        <>
          <TextView>
            {i18n.t('Profile name (with no spaces)')}
          </TextView>
          <InputTextField
            value={formData?.profile_name}
            placeholder={i18n.t('Profile name')}
            onChangeText={(value: string) => updateField('profile_name', value)}
          />

          <TextView>
            {i18n.t('About')}
          </TextView>
          <InputTextareaField
            value={formData?.profile_description}
            placeholder={i18n.t('Profile description')}
            onChangeText={(value: string) => updateField('profile_description', value)}
          />

          <TextView>
            {i18n.t('Address')}
          </TextView>
          <InputTextField
            value={formData?.address}
            placeholder={i18n.t('Enter your address')}
            onChangeText={(value: string) => updateField('address', value)}
          />

          <TextView>
            {i18n.t('Sectors')}
          </TextView>
          <SectorsField
            resource="profile"
            field="sectors_ids"
            placeholder={i18n.t('Select your sectors')}
            value={formData?.sectors_ids}
            onChangeValue={(value: any) => updateField('sectors_ids', value)}
            onPress={() => ModalManager.toggleModal('SectorsList', {
              resource: 'profile',
              field: 'sectors_ids',
            })}
          />

          <TextView>
            {i18n.t('Country')}
          </TextView>
          <CountryField
            value={formData?.scope_country_code}
            onChangeValue={(o: any) => updateField('scope_country_code', o.value)}
          />

          <TextView>
            {i18n.t('Password')}*
          </TextView>
          <InputTextField
            value={formData?.password}
            placeholder={i18n.t('Password')}
            onChangeText={(value: string) => updateField('password', value)}
          />

          <TextView>
            {i18n.t('Location')}
          </TextView>
          <LocationPickerField
            resource="profile"
            placeholder={i18n.t('Select your location')}
            onChangeValue={(data: any) => {
              updateField('geolocation_latitude', data?.geolocation_latitude);
              updateField('geolocation_longitude', data?.geolocation_longitude);
            }}
            onPress={() => ModalManager.toggleModal('LocationMapView', {
              resource: 'profile',
              latitude: {
                field: 'geolocation_latitude',
                value: formData?.geolocation_latitude,
              },
              longitude: {
                field: 'geolocation_longitude',
                value: formData?.geolocation_longitude,
              },
            })}
            latitude={{
              field: 'geolocation_latitude',
              value: formData?.geolocation_latitude,
            }}
            longitude={{
              field: 'geolocation_longitude',
              value: formData?.geolocation_longitude,
            }}
          />
        </>
      )}

      {/* Submit button */}
      <View style={styles.submitButtonContainer}>
        <ButtonView
          label={i18n.t('Continue')}
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

export default SignupForm;
