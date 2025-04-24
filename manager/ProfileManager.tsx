import { Layout } from '@/constants/Layout';
import { setFormData } from '@/redux/slices/FormSlice';
import Store from '@/redux/Store';
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';
import i18n from '@/translation/i18n';
import InputTextareaField from '@/components/field/InputTextareaField';
import CountryField from '@/components/field/CountryField';
import SectorsField from '@/components/field/SectorsField';
import LocationPickerField from '@/components/field/LocationPickerField';
import PersonalProfileForm from '@/components/form/profile-form/PersonalProfileForm';
import OrganizationProfileForm from '@/components/form/profile-form/OrganizationProfileForm';
import VenueProfileForm from '@/components/form/profile-form/VenueProfileForm';
import ModalManager from './ModalManager';

class ProfileManager {
  getStyles() {
    return {
      container: {
        marginBottom: Layout.space.base * 4,
        paddingLeft: 0,
        paddingRight: 0,
      },
      label: {
        marginBottom: Layout.space.base / 2,
      },
    };
  }

  setFormData(item: any, value: any) {
    let payload: any = {
      resource: 'profile',
      key: item.key,
      value: value,
    };

    Store.dispatch(setFormData(payload));
  }

  canRenderField(resource: string, item: any, formData: any) {
    return item.enabled === true
      && item[resource] === true
      //&& (formData?.profile_type?.length || item.key === 'profile_type' )
      && (item.profileType === 'all' || item.profileType === formData?.profile_type);
  }

  renderField(resource: string, item: any, formData: any, params?: any) {
    return (
      <>
        {item.label !== null && (
          <TextView style={this.getStyles().label}>
            {i18n.t(item.label)} {item?.required === true ? '*' : ''}
          </TextView>
        )}

        {item.render(resource, item, formData, params)}
      </>
    );
  }

  getFields() {
    return [
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'profile_personal',
        label: null,
        profileType: 'personal',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <PersonalProfileForm 
              key={item.key}
              resource={resource}
              item={item} 
              data={data} 
              params={params} 
              parentKey={item.key}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'profile_organization',
        label: null,
        profileType: 'organization',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <OrganizationProfileForm 
              key={item.key}
              resource={resource}
              item={item} 
              data={data} 
              params={params} 
              parentKey={item.key}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'profile_venue',
        label: null,
        profileType: 'venue',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <VenueProfileForm
              key={item.key}
              resource={resource}
              item={item} 
              data={data} 
              params={params} 
              parentKey={item.key}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'profile_name',
        label: i18n.t('Profile name (with no spaces)'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={i18n.t('Profile name')}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: false,
        key: 'profile_description',
        label: i18n.t('About'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextareaField
              key={item.key}
              value={data[item.key]}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: false,
        key: 'address',
        label: i18n.t('Address'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={i18n.t('Enter your address')}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: false,
        profile: true,
        enabled: true,
        required: false,
        key: 'upload_other_docs',
        label: i18n.t('Other documents'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: false,
        key: 'sectors_ids',
        label: i18n.t('Sectors'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <SectorsField
              key={item.key}
              resource="profile"
              field={item.key}
              placeholder={i18n.t('Select your sectors')}
              value={data[item.key]}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'scope_country_code',
        label: i18n.t('Country'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <CountryField
              key={item.key}
              value={data[item.key]}
              onChangeValue={(o: any) => this.setFormData(item, o.value)}
            />
          );
        },
      },
      {
        signup: false,
        profile: true,
        enabled: true,
        required: false,
        key: 'region',
        label: i18n.t('Region'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: false,
        profile: true,
        enabled: true,
        required: false,
        key: 'town_or_locality',
        label: i18n.t('Locality'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: false,
        profile: true,
        enabled: true,
        required: false,
        key: 'other_town_or_locality',
        label: i18n.t('Other locality'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: false,
        profile: true,
        enabled: true,
        required: true,
        key: 'email',
        label: i18n.t('Email'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={i18n.t('Enter your email address')}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: false,
        profile: true,
        enabled: true,
        required: false,
        key: 'whatsapp_number',
        label: i18n.t('Whatsapp number'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: true,
        profile: false,
        enabled: true,
        required: true,
        key: 'password',
        label: i18n.t('Password'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: false,
        key: null,
        label: i18n.t('Location'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <LocationPickerField
              resource="profile"
              placeholder={i18n.t('Select your location')}
              latitude={{
                field: 'geolocation_latitude',
                value: data?.geolocation_latitude,
              }}
              longitude={{
                field: 'geolocation_longitude',
                value: data?.geolocation_longitude,
              }}
            />
          );
        },
      },
      {
        signup: false,
        profile: true,
        enabled: true,
        required: false,
        key: 'phone_number',
        label: i18n.t('Phone number'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: false,
        profile: true,
        enabled: true,
        required: false,
        key: 'website_link',
        label: i18n.t('Website link'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: false,
        profile: true,
        enabled: true,
        required: false,
        key: 'instagram_id',
        label: i18n.t('Instagram ID'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: false,
        profile: true,
        enabled: true,
        required: false,
        key: 'facebook_link',
        label: i18n.t('Facebook link'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
      {
        signup: false,
        profile: true,
        enabled: true,
        required: false,
        key: 'linkedin_link',
        label: i18n.t('Linkedin link'),
        profileType: 'all',
        render: (resource: string, item: any, data: any, params?: any) => {
          return (
            <InputTextField
              key={item.key}
              value={data[item.key]}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
    ];
  }

  // Todo - Move subform fields here
  getSubFields() {
    return [
    ];
  }

  submitForm() { }
};

export default (new ProfileManager());