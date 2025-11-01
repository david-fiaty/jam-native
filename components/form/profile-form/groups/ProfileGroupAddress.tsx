import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import ModalManager from "@/manager/ModalManager";
import FormManager from "@/manager/FormManager";
import LocationPickerField from "@/components/field/LocationPickerField";
import CountriesField from "@/components/field/CountriesField";
import InputTextareaField from "@/components/field/InputTextareaField";
import GroupTitleView from "@/components/view/GroupTitleView";

type Props = {
  resource: any;
  formData: any;
};

const ProfileGroupAddress = ({ resource, formData }: Props) => {
  return (
    <>
      <GroupTitleView label={i18n.t("Address and location")} />

      <TextView>
        {i18n.t('Address')}
      </TextView>
      <InputTextareaField
        resource={resource}
        fieldKey="address"
        rules={['string']}
        value={formData?.address || ''}
        placeholder={i18n.t('Enter your address')}
      />

      <TextView>
        {i18n.t('City')}
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="other_town_or_locality"
        rules={['string']}
        value={formData?.other_town_or_locality || ''}
        placeholder={i18n.t('Other town or locality')}
      />
      {FormManager.renderError('other_town_or_locality')}

      <TextView>{i18n.t('Country')}</TextView>
      <CountriesField
        multiple={false}
        resource={resource}
        field="scope_country_code"
        placeholder={i18n.t('Select a country')}
        value={formData?.scope_country_code || ''}
        onPress={() => ModalManager.toggleModal('CountriesList', {
          resource: resource,
          field: 'scope_country_code',
          multiple: false,
        })}
      />
      {FormManager.renderError('scope_country_code')}

      <TextView>
        {i18n.t('Location')}*
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

export default ProfileGroupAddress;