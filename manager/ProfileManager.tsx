import { View } from 'react-native';
import { Layout } from '@/constants/Layout';
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';
import i18n from '@/translation/i18n';

class ProfileManager {
  renderFields() {
    return (
      <View style={Layout.formContainer}>
        {this.getFields().map((item: any) => {
          return (
            <View key={item.key}>
              <TextView>{i18n.t(item.label)}</TextView>
              {item.render(item, {
                onChange: this.onValueChange(item),
              })}
            </View>
          );
        })}
      </View>
    );
  }

  getFields() {
    return [
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'profile_name',
        label: i18n.t('Profile name'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'profile_description',
        label: i18n.t('About'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'upload_profile_picture',
        label: i18n.t('Profile picture'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'upload_other_docs',
        label: i18n.t('Other documents'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'sectors_ids',
        label: i18n.t('Sectors'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
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
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'region',
        label: i18n.t('Region'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'town_or_locality',
        label: i18n.t('Locality'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'other_town_or_locality',
        label: i18n.t('Other locality'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'address',
        label: i18n.t('Address'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'geolocation_latitude',
        label: i18n.t('Latitude'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'geolocation_longitude',
        label: i18n.t('Longitude'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'email',
        label: i18n.t('Email'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'whatsapp_number',
        label: i18n.t('Whatsapp number'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'phone_number',
        label: i18n.t('Phone number'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'website_link',
        label: i18n.t('Website link'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'instagram_id',
        label: i18n.t('Instagram ID'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'facebook_link',
        label: i18n.t('Facebook link'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'linkedin_link',
        label: i18n.t('Linkedin link'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'profile_type',
        label: i18n.t('Profile type'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'profile_personal',
        label: i18n.t('Personal profile'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
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
        label: i18n.t('Organization profile'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
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
        label: i18n.t('Venue profile'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        key: 'password',
        label: i18n.t('Password'),
        render: (item: any, params: any) => {
          return (
            <InputTextField
              placeholder={item.label}
            />
          );
        },
      },
    ];
  }

  onValueChange(item: any) {}

  submitForm() {}
};

export default (new ProfileManager());