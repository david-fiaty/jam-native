import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { setFormData } from "@/redux/slices/FormSlice";
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
import ProfileTypeField from "../field/ProfileTypeField";
import FormManager from "@/manager/FormManager";
import BoxView from "../view/BoxView";
import VenueTypesField from "../field/VenueTypesField";

const resource: string = 'profile';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const formData = useSelector((state: any) => state.form?.[resource]);

  const submitForm = async () => {
    setIsProcessing(true);
    let result: any = await UserManager.updateProfile(formData);

    // Todo - Implement profile update submission
    console.log('-------');
    console.log(Object.keys(formData));

    //console.log(result);

    return;

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

    setIsProcessing(false);
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileId(await UserManager.getProfileId());

        dispatch(setFormData<any>({
          resource: resource,
          key: null,
          value: await UserManager.getProfileData(),
        }));

        setIsLoaded(true);
      }
    })();
  }, [isLoaded, formData, resource]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={[Layout.formContainer, styles.container]}
    >
      <BoxView direction="column" style={[Layout.formContainer, styles.formContainer]}>
        <ProfileImageField
          value={formData?.upload_profile_picture?.url}
          onChangeValue={(mediaList: any) => FormManager.updateField(resource, 'upload_profile_picture', { url: mediaList[0]?.uri })}
        />
        {FormManager.renderError('upload_profile_picture')}

        <TextView>{i18n.t('Profile type')}*</TextView>
        <ProfileTypeField
          value={formData?.profile_type}
          onChangeValue={(option: any) => FormManager.updateField(resource, 'profile_type', option.value, ['string'])}
          disabled={true}
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
              onChangeText={(value: string) => FormManager.updateField(resource, 'profile_personal.first_name', {
                ...(formData?.profile_personal || {}),
                ...{ first_name: value },
              }, ['string'])}
            />
            {FormManager.renderError('profile_personal.first_name')}

            <TextView>
              {i18n.t('Last name')}
            </TextView>
            <InputTextField
              value={formData?.profile_personal?.last_name}
              placeholder={i18n.t('Enter your last name')}
              onChangeText={(value: string) => FormManager.updateField(resource, 'profile_personal.last_name', {
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
              onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization.organization_name', {
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
              onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization.creation_year', {
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
              onChangeText={(value: string) => FormManager.updateField(resource, 'profile_venue.venue_name', {
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
              placeholder={i18n.t('Select venue types')}
              value={formData?.venue_types}
              onPress={() => ModalManager.toggleModal('VenueTypesList', {
                resource: resource,
                field: "venue_types",
              })}
            />

            <TextView>
              {i18n.t('Creation year')}
            </TextView>
            <InputTextField
              keyboardType="number-pad"
              value={formData?.profile_venue?.creation_year}
              placeholder={i18n.t('Enter the creation year')}
              onChangeText={(value: string) => FormManager.updateField(resource, 'profile_venue.creation_year', {
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
              {i18n.t('Profile name (with no spaces)')}
            </TextView>
            <InputTextField
              value={formData?.profile_name}
              placeholder={i18n.t('Profile name')}
              // Todo - Add nospace validation
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

            <TextView>
              {i18n.t('Sectors')}
            </TextView>
            <SectorsField
              resource="profile"
              field="sectors_ids"
              placeholder={i18n.t('Select your sectors')}
              value={formData?.sectors_ids}
              onPress={() => ModalManager.toggleModal('SectorsList', {
                resource: 'profile',
                field: 'sectors_ids',
              })}
            />
            {FormManager.renderError('sectors_ids')}

            <TextView>
              {i18n.t('Country')}
            </TextView>
            <CountryField
              value={formData?.scope_country_code}
              onChangeValue={(o: any) => FormManager.updateField(resource, 'scope_country_code', o.value, ['string'])}
            />
            {FormManager.renderError('scope_country_code')}

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
            label={i18n.t('Update')}
            isProcessing={isProcessing}
            onPress={submitForm}
          />
        </View>
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Layout.space.base,
    paddingBottom: Layout.space.base * 2,
    width: '100%',
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
});

export default ProfileForm;
