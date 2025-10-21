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
import InputTextField from "@/components/field/InputTextField";
import InputTextareaField from "@/components/field/InputTextareaField";
import SectorsField from "@/components/field/SectorsField";
import ModalManager from "@/manager/ModalManager";
import LocationPickerField from "@/components/field/LocationPickerField";
import ProfileTypeField from "@/components/field/ProfileTypeField";
import FormManager from "@/manager/FormManager";
import BoxView from "@/components/view/BoxView";
import VenueTypesField from "@/components/field/VenueTypesField";
import CountriesField from "@/components/field/CountriesField";
import OrganizationTypesField from "../field/OrganizationTypesField";

const resource: string = 'profile';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const formData = useSelector((state: any) => state.form?.[resource]);
  const userState = useSelector((state: any) => state.user);

  const submitForm = async () => {
    setIsProcessing(true);

    let data: any = {...formData};

    delete data.profile_picture;
    if (data.hasOwnProperty('upload_profile_picture') && data.upload_profile_picture === null) {
      delete data.upload_profile_picture;
    }

    let result: any = await UserManager.updateProfile(data);

    if (result?.success === false) {
      ScreenManager.showMessage({
        title: i18n.t('Profile update'),
        content: i18n.t('There was an error with the submission. Please check your data and try again.'),
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

    setIsProcessing(false);
  };

  const loadFormData = async () => {
    let data: any = {...userState.profileData};
    let profileId: any = userState.profileData.id;

    data = {
      ...data,
      ...{ 
        scope_country_code: userState.profileData?.country || '',
        sectors_ids: userState.profileData?.sectors || [],
        upload_profile_picture: null,
      },
    };

    delete data.country;
    delete data.sectors;

    dispatch(setFormData<any>({
      resource: resource,
      key: null,
      value: {
        ...data,
        ...{ profile_id: profileId },
      },
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
              onChangeText={(value: string) => FormManager.updateField(resource, 'profile_personal', {
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

            <OrganizationTypesField
              resource={resource}
              field="organization_types"
              parent="profile_organization"
              placeholder={i18n.t('Select organization types')}
              value={formData?.profile_organization?.organization_types}
              onPress={() => ModalManager.toggleModal('OrganizationTypesList', {
                resource: resource,
                field: "organization_types",
                parent: "profile_organization",
              })}
            />
            {FormManager.renderError('profile_organization.organization_types')}

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
              {i18n.t('Venue types')}*
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
              // Todo - Add nospace validation
              onChangeText={(value: string) => FormManager.updateField(resource, 'profile_name', value, ['string'])}
            />
            {FormManager.renderError('profile_name')}

            <TextView>
              {i18n.t('Profile email')}
            </TextView>
            <InputTextField
              value={formData?.email}
              placeholder={i18n.t('Enter a profile email')}
              onChangeText={(value: string) => FormManager.updateField(resource, 'email', value, ['email'])}
            />
            {FormManager.renderError('email')}

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
            <InputTextareaField
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

            <TextView>{i18n.t('Country')}</TextView>
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
            label={i18n.t('Update')}
            isProcessing={isProcessing}
            onPress={submitForm}
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
});

export default ProfileForm;