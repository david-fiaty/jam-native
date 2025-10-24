import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { useSelector } from "react-redux";
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
import SectorsField from "../field/SectorsField";
import ModalManager from "@/manager/ModalManager";
import LocationPickerField from "../field/LocationPickerField";
import FormManager from "@/manager/FormManager";
import SectionManager from "@/manager/SectionManager";
import VenueTypesField from "../field/VenueTypesField";
import InputPasswordField from "../field/InputPasswordField";
import CountriesField from "../field/CountriesField";
import ProfileForm from "./ProfileForm";

const resource: string = 'signup';

const SignupForm = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
  const formData = useSelector((state: any) => state.form[resource]);
  const signupData: any = useSelector((state: any) => state.form[resource]);

  const submitForm = async () => {
    let { password, password_confirmation, ...profileData } = formData;

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
        content: result.message,
      });
    }
    else {
      SectionManager.push(router, Config.mainSection);
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

  return <ProfileForm />;
  
  return (
    <View style={[Layout.formContainer, styles.container]}>

      <ProfileImageField
        value={formData?.upload_profile_picture?.url}
        onChangeValue={(mediaList: any) => FormManager.updateField(resource, 'upload_profile_picture', { url: mediaList[0]?.uri })}
      />
      {FormManager.renderError('upload_profile_picture')}

      <TextView>{i18n.t('Profile type')}*</TextView>
      <ProfileTypeField
        value={formData?.profile_type}
        onChangeValue={(option: any) => FormManager.updateField(resource, 'profile_type', option.value, ['string'])}
      />
      {FormManager.renderError('profile_type')}

      {/* Personal profile */}
      {formData?.profile_type == 'personal' && (
        <>
          <TextView>
            {i18n.t('First name')}*
          </TextView>
          <InputTextField
            value={formData?.profile_personal?.first_name}
            placeholder={i18n.t('Enter your first name')}
            onChangeText={(value: string) => FormManager.updateField(resource, 'profile_personal', {
              ...(formData?.profile_personal || {}),
              ...{ first_name: value },
            }, ['string'])}
          />
          {FormManager.renderError('profile_personal.first_name')}

          <TextView>
            {i18n.t('Last name')}*
          </TextView>
          <InputTextField
            value={formData?.profile_personal?.last_name}
            placeholder={i18n.t('Enter your last name')}
            onChangeText={(value: string) => FormManager.updateField(resource, 'profile_personal', {
              ...(formData?.profile_personal || {}),
              ...{ last_name: value },
            }, ['string'])}
          />
          {FormManager.renderError('profile_personal.last_name')}
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
            onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization', {
              ...(formData?.profile_organization || {}),
              ...{ organization_name: value },
            }, ['string'])}
          />
          {FormManager.renderError('profile_organization.organization_name')}

          <TextView>
            {i18n.t('Creation year')}
          </TextView>
          <InputTextField
            keyboardType="number-pad"
            value={formData?.profile_organization?.creation_year}
            placeholder={i18n.t('Enter the creation year')}
            onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization', {
              ...(formData?.profile_organization || {}),
              ...{ creation_year: value },
            })}
          />
          {FormManager.renderError('profile_organization.creation_year')}
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
            onChangeText={(value: string) => FormManager.updateField(resource, 'profile_venue', {
              ...(formData?.profile_venue || {}),
              ...{ venue_name: value },
            }, ['string'])}
          />
          {FormManager.renderError('profile_venue.venue_name')}

          <TextView>
            {i18n.t('Venue types')}
          </TextView>
          <VenueTypesField
            resource={resource}
            field="venue_types"
            parent="profile_venue"
            placeholder={i18n.t('Select venue types')}
            value={formData?.profile_venue?.venue_types}
            onPress={() => ModalManager.toggleModal('VenueTypesList', {
              resource: resource,
              field: "venue_types",
              parent: "profile_venue",
            })}
          />
          {FormManager.renderError('profile_venue.venue_types')}

          <TextView>
            {i18n.t('Creation year')}
          </TextView>
          <InputTextField
            keyboardType="number-pad"
            value={formData?.profile_venue?.creation_year}
            placeholder={i18n.t('Enter the creation year')}
            onChangeText={(value: string) => FormManager.updateField(resource, 'profile_venue', {
              ...(formData?.profile_venue || {}),
              ...{ creation_year: value },
            }, ['number'])}
          />
          {FormManager.renderError('profile_venue.creation_year')}
        </>
      )}

      {/* All profiles */}
      {formData?.profile_type?.length && (
        <>
          <TextView>
            {i18n.t('Profile name (with no spaces)')}*
          </TextView>
          <InputTextField
            value={formData?.profile_name}
            placeholder={i18n.t('Profile name')}
            onChangeText={(value: string) => FormManager.updateField(resource, 'profile_name', value, ['string'])}
          />
          {FormManager.renderError('profile_name')}

          <TextView>
            {i18n.t('About')}
          </TextView>
          <InputTextareaField
            value={formData?.profile_description}
            placeholder={i18n.t('Profile description')}
            onChangeText={(value: string) => FormManager.updateField(resource, 'profile_description', value)}
          />
          {FormManager.renderError('profile_description')}

          <TextView>
            {i18n.t('Address')}
          </TextView>
          <InputTextField
            value={formData?.address}
            placeholder={i18n.t('Enter your address')}
            onChangeText={(value: string) => FormManager.updateField(resource, 'address', value)}
          />
          {FormManager.renderError('address')}

          <SectorsField
            resource={resource}
            field="sectors_ids"
            value={formData?.sectors_ids}
          />

          <TextView>
            {i18n.t('Country')}
          </TextView>
          <CountriesField
            multiple={false}
            resource={resource}
            field="scope_country_code"
            placeholder={i18n.t('Select a country')}
            value={formData?.scope_country_code}
            onPress={() => ModalManager.toggleModal('CountriesList', {
              resource: resource,
              field: 'scope_country_code',
              multiple: false,
            })}
          />
          {FormManager.renderError('scope_country_code')}

          <TextView>
            {i18n.t('Password')}*
          </TextView>
          <InputPasswordField
            value={formData?.password}
            placeholder={i18n.t('Password')}
            onChangeText={(value: string) => FormManager.updateField(resource, 'password', value, ['string'])}
          />
          {FormManager.renderError('password')}

          <TextView>
            {i18n.t('Password confirmation')}*
          </TextView>
          <InputPasswordField
            value={formData?.password_confirmation}
            placeholder={i18n.t('Password confirmation')}
            onChangeText={(value: string) => {
              FormManager.updateField(resource, 'password_confirmation', value, ['string']);
              FormManager.validatePasswordMatch(resource, 'password_confirmation', value, formData?.password);
            }}
          />
          {FormManager.renderError('password_confirmation')}

          <TextView>
            {i18n.t('Location')}
          </TextView>
          <LocationPickerField
            resource="profile"
            placeholder={i18n.t('Select your location')}
            onChangeValue={(data: any) => {
              FormManager.updateField(resource, 'geolocation_latitude', data?.geolocation_latitude);
              FormManager.updateField(resource, 'geolocation_longitude', data?.geolocation_longitude);
            }}
            onPress={() => ModalManager.toggleModal('SelectLocationMapView', {
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
          disabled={!formData?.profile_type?.length}
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
