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
import SectorsField from "@/components/field/SectorsField";

type Props = {
  resource: any;
  formData: any;
};

const ProfileFormPersonal = ({ resource, formData }: Props) => {
  return (
    <>
      <TextView style={styles.groupTitle}>
        {i18n.t("Personal information")}
      </TextView>

      <TextView>
        {i18n.t('First name')}*
      </TextView>
      <InputTextField
        value={formData?.profile_personal?.first_name}
        placeholder={i18n.t('Enter your first name')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_personal', {
          ...(formData?.profile_personal || {}),
          ...{ first_name: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_personal.first_name')}

      <TextView>
        {i18n.t('Last name')}
      </TextView>
      <InputTextField
        value={formData?.profile_personal?.last_name}
        placeholder={i18n.t('Enter your last name')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_personal', {
          ...(formData?.profile_personal || {}),
          ...{ last_name: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_personal.last_name')}

      <TextView style={styles.groupTitle}>
        {i18n.t("Sectors and activities")}
      </TextView>

      <ProfessionsField
        resource={resource}
        field="professions_ids"
        value={formData?.professions_ids}
      />

      <TextView>
        {i18n.t('Main cultural activities')}
      </TextView>
      <CulturalActivityTypesField
        resource={resource}
        field="main_cultural_activities"
        parent="profile_personal"
        placeholder={i18n.t('Select cultural activities')}
        value={formData?.profile_personal?.main_cultural_activities}
        onPress={() => ModalManager.toggleModal('CulturalActivityTypesList', {
          resource: resource,
          field: "main_cultural_activities",
          parent: "profile_personal",
        })}
      />
      {FormManager.renderError('profile_personal.main_cultural_activities')}

      <TextView>
        {i18n.t('Other cultural activities')}
      </TextView>
      <InputTextField
        value={formData?.profile_personal?.other_cultural_activities}
        placeholder={i18n.t('Enter other cultural activities')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_personal', {
          ...(formData?.profile_personal || {}),
          ...{ other_cultural_activities: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_personal.other_cultural_activities')}     

      <SectorsField
        resource={resource}
        field="sectors_ids"
        value={formData?.sectors_ids}
      /> 
    </>
  );
}

const styles = StyleSheet.create({
  groupTitle: {
    fontWeight: 'bold',
    marginTop: Layout.space.base*1.5,
  },
});

export default ProfileFormPersonal;