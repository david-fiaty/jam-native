import React from "react";
import i18n from "@/translation/i18n";
import InputTextField from "@/components/field/InputTextField";
import LocationPickerField from "@/components/field/LocationPickerField";
import CountriesField from "@/components/field/CountriesField";
import InputTextareaField from "@/components/field/InputTextareaField";
import GroupTitleView from "@/components/view/GroupTitleView";

type Props = {
  resource: any;
  formData: any;
  parentKey?: any;
};

const ProfileGroupAddress = ({ resource, formData, parentKey }: Props) => {
  return (
    <>
      <GroupTitleView label={i18n.t("Address and location")} />

      <InputTextareaField
        resource={resource}
        fieldKey="address"
        rules={['string']}
        value={formData?.address || ''}
        label={i18n.t('Address')}
        placeholder={i18n.t('Enter your address')}
      />

      <InputTextField
        resource={resource}
        fieldKey="other_town_or_locality"
        rules={['string']}
        value={formData?.other_town_or_locality || ''}
        label={i18n.t('City')}
        placeholder={i18n.t('Other town or locality')}
      />

      <CountriesField
        resource={resource}
        fieldKey="scope_country_code"
        multiple={false}
        value={formData?.scope_country_code || ''} 
        label={i18n.t('Country')}
        placeholder={i18n.t('Select a country')}
      />

      <LocationPickerField
        resource={resource}
        latitudeKey="geolocation_latitude"
        longitudeKey="geolocation_longitude"
        latitudeValue={formData?.geolocation_latitude || ''}
        longitudeValue={formData?.geolocation_longitude || ''}
        rules={['required']}
        label={i18n.t('Location')}
        placeholder={i18n.t('Select your location')}
      />
    </>
  );
}

export default ProfileGroupAddress;