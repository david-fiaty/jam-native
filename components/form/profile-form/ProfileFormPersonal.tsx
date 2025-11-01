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
import ProfileGroupActivities from "./groups/ProfileGroupActivities";

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

      <ProfileGroupActivities resource={resource} formData={formData} />
    </>
  );
}

export default ProfileFormPersonal;