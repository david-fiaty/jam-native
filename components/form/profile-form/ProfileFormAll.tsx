import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import FormManager from "@/manager/FormManager";
import InputTextareaField from "@/components/field/InputTextareaField";
import SectorsField from "@/components/field/SectorsField";
import ProfileGroupAddress from "./groups/ProfileGroupAddress";
import ProfileGroupNetworks from "./groups/ProfileGroupNetworks";

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

      <ProfileGroupAddress resource={resource} formData={formData} />

      <ProfileGroupNetworks resource={resource} formData={formData} />
    </>
  );
}

const styles = StyleSheet.create({
  groupTitle: {
    fontWeight: 'bold',
    marginTop: Layout.space.base * 1.5,
  },
});

export default ProfileFormAll;