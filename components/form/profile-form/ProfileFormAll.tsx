import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
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
        {i18n.t('Description')}*
      </TextView>
      <InputTextareaField
        value={formData?.profile_description}
        placeholder={i18n.t('Profile description')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_description', value)}
      />
      {FormManager.renderError('profile_description')}

      <ProfileGroupAddress resource={resource} formData={formData} />

      <ProfileGroupNetworks resource={resource} formData={formData} />

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

export default ProfileFormAll;