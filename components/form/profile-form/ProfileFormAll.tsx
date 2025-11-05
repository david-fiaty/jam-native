import React from "react";
import i18n from "@/translation/i18n";
import InputTextField from "@/components/field/InputTextField";
import FormManager from "@/manager/FormManager";
import InputTextareaField from "@/components/field/InputTextareaField";
import InputPasswordField from "@/components/field/InputPasswordField";
import ProfileGroupNetworks from "./groups/ProfileGroupNetworks";
import ProfileGroupAddress from "./groups/ProfileGroupAddress";

type Props = {
  resource: any;
  formData: any;
};

const ProfileFormAll = ({ resource, formData }: Props) => {
  return (
    <>
      <InputTextField
        resource={resource}
        fieldKey="profile_name"
        rules={['required', 'nospace', 'string']}
        value={formData?.profile_name || ''}
        label={i18n.t('Profile name (with no spaces)')}
        placeholder={i18n.t('Profile name')}
      />

      <InputTextField
        resource={resource}
        fieldKey="email"
        rules={['string', 'email']}
        value={formData?.email || ''}
        label={i18n.t('Profile email')}
        placeholder={i18n.t('Enter a profile email')}
      />

      <InputTextField
        resource={resource}
        fieldKey="phone_number"
        rules={['string']}
        value={formData?.phone_number || ''}
        label={i18n.t('Phone number')}
        placeholder={i18n.t('Enter your phone number')}
        keyboardType="number-pad"
      />
      {FormManager.renderError('phone_number')}

      <InputTextareaField
        resource={resource}
        fieldKey="profile_description"
        rules={['required', 'string']}
        value={formData?.profile_description || ''}
        label={i18n.t('Description')}
        placeholder={i18n.t('Profile description')}
      />

      <ProfileGroupAddress resource={resource} formData={formData} />

      <ProfileGroupNetworks resource={resource} formData={formData} />

      {resource == 'signup' && (
        <>
          <InputPasswordField
            resource={resource}
            fieldKey="password"
            rules={['required', 'string']}
            value={formData?.password || ''}
            label={i18n.t('Password')}
            placeholder={i18n.t('Your password')}
          />

          <InputPasswordField
            resource={resource}
            fieldKey="password_confirmation"
            rules={['required', 'string']}
            value={formData?.password_confirmation || ''}
            label={i18n.t('Confirmation')}
            placeholder={i18n.t('Password confirmation')}
            onChangeText={(value: string) => {
              FormManager.updateField(resource, 'password_confirmation', value, ['string']);
              FormManager.validatePasswordMatch(resource, 'password_confirmation', value, formData?.password);
            }}
          />
        </>
      )}
    </>
  );
}

export default ProfileFormAll;