import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import ModalManager from "@/manager/ModalManager";
import FormManager from "@/manager/FormManager";
import InputTextareaField from "@/components/field/InputTextareaField";
import SectorsField from "@/components/field/SectorsField";
import CountriesField from "@/components/field/CountriesField";
import LocationPickerField from "@/components/field/LocationPickerField";

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
  );
}

export default ProfileFormAll;