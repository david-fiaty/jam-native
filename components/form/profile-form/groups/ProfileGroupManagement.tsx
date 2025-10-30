import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import ModalManager from "@/manager/ModalManager";
import FormManager from "@/manager/FormManager";
import CulturalActivityTypesField from "@/components/field/CulturalActivityTypesField";
import ProfessionsField from "@/components/field/ProfessionsField";

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