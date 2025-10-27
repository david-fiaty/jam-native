import React from "react";
import { StyleSheet } from "react-native";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import ModalManager from "@/manager/ModalManager";
import FormManager from "@/manager/FormManager";
import InputTextareaField from "@/components/field/InputTextareaField";
import SectorsField from "@/components/field/SectorsField";
import CountriesField from "@/components/field/CountriesField";
import LocationPickerField from "@/components/field/LocationPickerField";
import InputPasswordField from "@/components/field/InputPasswordField";
import { Layout } from "@/constants/Layout";

type Props = {
  resource: any;
  formData: any;
};

const ProfileFormAll = ({ resource, formData }: Props) => {
  return (
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
        {i18n.t('Phone number')}
      </TextView>
      <InputTextField
        value={formData?.phone_number || ''}
        placeholder={i18n.t('Enter your phone number')}
        keyboardType="number-pad"
        onChangeText={(value: string) => FormManager.updateField(resource, 'phone_number', value, ['string'])}
      />
      {FormManager.renderError('phone_number')}

      <TextView>
        {i18n.t('About')}
      </TextView>
      <InputTextareaField
        value={formData?.profile_description}
        placeholder={i18n.t('Profile description')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_description', value)}
      />
      {FormManager.renderError('profile_description')}

      <SectorsField
        resource={resource}
        field="sectors_ids"
        value={formData?.sectors_ids}
      />

      <TextView>
        {i18n.t('Address')}
      </TextView>
      <InputTextareaField
        value={formData?.address}
        placeholder={i18n.t('Enter your address')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'address', value)}
      />
      {FormManager.renderError('address')}

      <TextView>
        {i18n.t('City')}
      </TextView>
      <InputTextField
        value={formData?.town_or_locality}
        placeholder={i18n.t('Enter your city')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'town_or_locality', value)}
      />
      {FormManager.renderError('town_or_locality')}

      <TextView>
        {i18n.t('Other town or locality')}
      </TextView>
      <InputTextField
        value={formData?.other_town_or_locality}
        placeholder={i18n.t('Other town or locality')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'other_town_or_locality', value)}
      />
      {FormManager.renderError('other_town_or_locality')}


      <TextView>
        {i18n.t('Region')}
      </TextView>
      <InputTextField
        value={formData?.region}
        placeholder={i18n.t('Enter your region')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'region', value)}
      />
      {FormManager.renderError('region')}

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

      <TextView style={styles.groupTitle}>
        {i18n.t("Social networks")}
      </TextView>

      <TextView>
        {i18n.t('Linkedin page')}
      </TextView>
      <InputTextField
        value={formData?.linkedin_link || ''}
        placeholder={i18n.t('Enter your page link')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'linkedin_link', value, ['string'])}
      />
      {FormManager.renderError('linkedin_link')}

      <TextView>
        {i18n.t('Facebook page')}
      </TextView>
      <InputTextField
        value={formData?.facebook_link || ''}
        placeholder={i18n.t('Enter your page link')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'facebook_link', value, ['string'])}
      />
      {FormManager.renderError('facebook_link')}

      <TextView>
        {i18n.t('Instagram user name')}
      </TextView>
      <InputTextField
        value={formData?.instagram_username || ''}
        placeholder={i18n.t('Enter your user name')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'instagram_username', value, ['string'])}
      />
      {FormManager.renderError('instagram_username')}

      <TextView>
        {i18n.t('Website link')}
      </TextView>
      <InputTextField
        value={formData?.website_link || ''}
        placeholder={i18n.t('Enter your website link')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'website_link', value, ['string'])}
      />
      {FormManager.renderError('website_link')}




      {resource == 'signup' && (
        <>
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
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  groupTitle: {
    fontWeight: 'bold',
    marginTop: Layout.space.base*1.5,
  },
});

export default ProfileFormAll;