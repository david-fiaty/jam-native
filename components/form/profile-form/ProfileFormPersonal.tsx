import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import ModalManager from "@/manager/ModalManager";
import FormManager from "@/manager/FormManager";
import CulturalActivityTypesField from "@/components/field/CulturalActivityTypesField";
import ProfessionsField from "@/components/field/ProfessionsField";
import SectorsField from "@/components/field/SectorsField";
import GroupTitleView from "@/components/view/GroupTitleView";

type Props = {
  resource: any;
  formData: any;
};

const ProfileFormPersonal = ({ resource, formData }: Props) => {
  return (
    <>
      <GroupTitleView label={i18n.t("Personal information")} />

      <TextView>
        {i18n.t('First name')}*
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="first_name"
        parentKey="profile_personal"
        rules={['required', 'string']}
        formData={formData}
        value={formData?.profile_personal?.first_name || ''}
        placeholder={i18n.t('Enter your first name')}
      />

      <TextView>
        {i18n.t('Last name')}*
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="last_name"
        parentKey="profile_personal"
        rules={['required', 'string']}
        formData={formData}
        value={formData?.profile_personal?.last_name || ''}
        placeholder={i18n.t('Enter your last name')}
      />

      <GroupTitleView label={i18n.t("Sectors and activities")} />

      <ProfessionsField
        resource={resource}
        field="professions_ids"
        value={formData?.professions_ids || []}
      />

      <TextView>
        {i18n.t('Main cultural activities')}
      </TextView>
      <CulturalActivityTypesField
        resource={resource}
        field="main_cultural_activities"
        parent="profile_personal"
        placeholder={i18n.t('Select cultural activities')}
        value={formData?.profile_personal?.main_cultural_activities || []}
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
        resource={resource}
        fieldKey="other_cultural_activities"
        parentKey="profile_personal"
        rules={['string']}
        formData={formData}
        value={formData?.profile_personal?.other_cultural_activities || []}
        placeholder={i18n.t('Enter other cultural activities')}
      />

      <SectorsField
        resource={resource}
        field="sectors_ids"
        value={formData?.sectors_ids || []}
      /> 
    </>
  );
}

export default ProfileFormPersonal;