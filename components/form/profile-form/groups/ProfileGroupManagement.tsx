import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import FormManager from "@/manager/FormManager";

type Props = {
  resource: any;
  formData: any;
};

const ProfileGroupManagement = ({ resource, formData }: Props) => {
  return (
    <>
      <TextView style={styles.groupTitle}>
        {i18n.t("Management")}
      </TextView>

      <TextView>
        {i18n.t('Type of management')}
      </TextView>
      <InputTextField
        value={formData?.profile_organization?.type_of_management}
        placeholder={i18n.t('Enter the type of management')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization', {
          ...(formData?.profile_organization || {}),
          ...{ type_of_management: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_organization.type_of_management')}

      <TextView>
        {i18n.t('Managing organization')}
      </TextView>
      <InputTextField
        value={formData?.profile_organization?.organization_name_that_manages_organization}
        placeholder={i18n.t('Enter the managing organization name')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization', {
          ...(formData?.profile_organization || {}),
          ...{ organization_name_that_manages_organization: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_organization.organization_name_that_manages_organization')}

      <TextView>
        {i18n.t('Manager name')}
      </TextView>
      <InputTextField
        value={formData?.profile_organization?.manager_name}
        placeholder={i18n.t('Enter the manager name')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization', {
          ...(formData?.profile_organization || {}),
          ...{ manager_name: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_organization.manager_name')}

      <TextView>
        {i18n.t('Manager role')}
      </TextView>
      <InputTextField
        value={formData?.profile_organization?.manager_role}
        placeholder={i18n.t('Enter the manager role')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization', {
          ...(formData?.profile_organization || {}),
          ...{ manager_role: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_organization.manager_role')}

      <TextView>
        {i18n.t('Manager email')}
      </TextView>
      <InputTextField
        value={formData?.profile_organization?.manager_email}
        placeholder={i18n.t('Enter the manager email')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization', {
          ...(formData?.profile_organization || {}),
          ...{ manager_email: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_organization.manager_email')}

      <TextView>
        {i18n.t('Manager phone')}
      </TextView>
      <InputTextField
        value={formData?.profile_organization?.manager_phone}
        placeholder={i18n.t('Enter the manager phone')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization', {
          ...(formData?.profile_organization || {}),
          ...{ manager_phone: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_organization.manager_phone')}
    </>
  );
}

const styles = StyleSheet.create({
  groupTitle: {
    fontWeight: 'bold',
    marginTop: Layout.space.base*1.5,
  },
});

export default ProfileGroupManagement;