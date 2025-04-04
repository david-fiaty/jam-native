import { View } from 'react-native';
import { Layout } from '@/constants/Layout';
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';
import i18n from '@/translation/i18n';
import BoxView from '@/components/view/BoxView';
import ProfileTypeField from '@/components/field/ProfileTypeField';
import InputTextareaField from '@/components/field/InputTextareaField';

class ProfileManager {
  getContainerStyles() {
    return {
      marginBottom: Layout.space.base*4,
      paddingLeft: 0,
      paddingRight: 0,
    };
  }

  renderFields() {
    return (
      <BoxView
        align="flex-start"
        justify="flex-start"
        scroll={true}
        style={[Layout.screenContent, this.getContainerStyles()]}
      >
        <View style={Layout.formContainer}>
          {this.getFields().map((item: any) => {
            return this.renderField(item);
          })}
        </View>
      </BoxView>
    );
  }

  canRenderField(item: any) {
    return item.enabled === true;
  }

  renderField(item: any) { 
    if (this.canRenderField(item)) {
      return (
        <View key={item.key}>
          <TextView>{i18n.t(item.label)} {item?.required === true ? '*' : ''}</TextView>
            {item.render(item, {
              onChange: this.onValueChange(item),
            })}
        </View>
      );
    }

    return <></>;
  }

  getFields() {
    return [
      {
        signup: true,
        profile: true,
        enabled: true,
        required: false,
        key: 'upload_profile_picture',
        label: i18n.t('Profile picture'),
        groups: ['all'],
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
        profile: false,
        enabled: true,
        required: true,
        key: 'profile_type',
        label: i18n.t('Profile type'),
        groups: ['all'], 
        render: (item: any, params: any) => {
          return (
            <ProfileTypeField

            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: false,
        key: 'profile_name',
        label: i18n.t('Profile name'),
        groups: ['all'],
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
        required: false,
        key: 'profile_description',
        label: i18n.t('About'),
        groups: ['all'],
        render: (item: any, params: any) => {
          return (
            <InputTextareaField
              placeholder={item.label}
            />
          );
        },
      },
      {
        signup: true,
        profile: true,
        enabled: true,
        required: false,
        key: 'upload_other_docs',
        label: i18n.t('Other documents'),
        groups: ['all'],
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
        required: false,
        key: 'sectors_ids',
        label: i18n.t('Sectors'),
        groups: ['all'],
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
        groups: ['all'],
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
        required: false,
        key: 'region',
        label: i18n.t('Region'),
        groups: ['all'],
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
        required: false,
        key: 'town_or_locality',
        label: i18n.t('Locality'),
        groups: ['all'],
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
        required: false,
        key: 'other_town_or_locality',
        label: i18n.t('Other locality'),
        groups: ['all'],
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
        required: false,
        key: 'address',
        label: i18n.t('Address'),
        groups: ['all'],
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
        required: false,
        key: 'geolocation_latitude',
        label: i18n.t('Latitude'),
        groups: ['all'],
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
        required: false,
        key: 'geolocation_longitude',
        label: i18n.t('Longitude'),
        groups: ['all'],
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
        groups: ['all'],
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
        required: false,
        key: 'whatsapp_number',
        label: i18n.t('Whatsapp number'),
        groups: ['all'],
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
        required: false,
        key: 'phone_number',
        label: i18n.t('Phone number'),
        groups: ['all'],
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
        required: false,
        key: 'website_link',
        label: i18n.t('Website link'),
        groups: ['all'],
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
        required: false,
        key: 'instagram_id',
        label: i18n.t('Instagram ID'),
        groups: ['all'],
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
        required: false,
        key: 'facebook_link',
        label: i18n.t('Facebook link'),
        groups: ['all'],
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
        required: false,
        key: 'linkedin_link',
        label: i18n.t('Linkedin link'),
        groups: ['all'],
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
        groups: ['personal'],
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
        groups: ['organization'],
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
        groups: ['venue'],
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
        profile: false,
        enabled: true,
        required: true,
        key: 'password',
        label: i18n.t('Password'),
        groups: ['all'],
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