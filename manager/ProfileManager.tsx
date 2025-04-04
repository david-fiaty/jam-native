import { View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { setFormData } from '@/redux/slices/FormSlice';
import Store from '@/redux/Store';
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

  setFormData(item: any, value: any) {
    let payload: any =  {
      resource: 'profile',
      key: item.key,
      value: value,
    };

    Store.dispatch(setFormData(payload));
  }

  getFormValue(key: string) {
    let formData: any = this.getFormData();
    let formValue: any = formData?.[key] || '';

    return formValue;
  }

  getFormData() {
    return {...Store.getState().form?.profile};
  }

  renderFields() {
    let formData: any = this.getFormData();

    return (
      <BoxView
        align="flex-start"
        justify="flex-start"
        scroll={true}
        style={[Layout.screenContent, this.getContainerStyles()]}
      >
        <View style={Layout.formContainer}>
          {this.getFields().map((item: any) => {
            return this.renderField(item, formData);
          })}
        </View>
      </BoxView>
    );
  }

  canRenderField(item: any, formData: any) {
    return item.enabled === true 
      && (item.group === 'all' || item.group === formData?.['profile_type']);
  }

  renderField(item: any, formData: any) { 
    if (this.canRenderField(item, formData)) {
      return (
        <View key={item.key}>
          <TextView>{i18n.t(item.label)} {item?.required === true ? '*' : ''}</TextView>
            {item.render(item, {})}
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
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'profile_type',
        label: i18n.t('Profile type'),
        group: 'all', 
        render: (item: any, params: any) => {
          return (
            <ProfileTypeField
              value={this.getFormValue(item.key)}
              onChangeValue={(option: any) => this.setFormData(item, option.value)}
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
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'profile_description',
        label: i18n.t('About'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextareaField
              value={this.getFormValue(item.key)}
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
        key: 'upload_other_docs',
        label: i18n.t('Other documents'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        required: true,
        key: 'scope_country_code',
        label: i18n.t('Country'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'region',
        label: i18n.t('Region'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'town_or_locality',
        label: i18n.t('Locality'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'other_town_or_locality',
        label: i18n.t('Other locality'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'geolocation_latitude',
        label: i18n.t('Latitude'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'geolocation_longitude',
        label: i18n.t('Longitude'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        required: true,
        key: 'email',
        label: i18n.t('Email'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'whatsapp_number',
        label: i18n.t('Whatsapp number'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'phone_number',
        label: i18n.t('Phone number'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'website_link',
        label: i18n.t('Website link'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'instagram_id',
        label: i18n.t('Instagram ID'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'facebook_link',
        label: i18n.t('Facebook link'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        key: 'linkedin_link',
        label: i18n.t('Linkedin link'),
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        required: true,
        key: 'profile_personal',
        label: i18n.t('Personal profile'),
        group: 'personal',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        required: true,
        key: 'profile_organization',
        label: i18n.t('Organization profile'),
        group: 'organization',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        required: true,
        key: 'profile_venue',
        label: i18n.t('Venue profile'),
        group: 'venue',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
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
        group: 'all',
        render: (item: any, params: any) => {
          return (
            <InputTextField
              value={this.getFormValue(item.key)}
              placeholder={item.label}
              onChangeText={(value: string) => this.setFormData(item, value)}
            />
          );
        },
      },
    ];
  }

  submitForm() {}
};

export default (new ProfileManager());