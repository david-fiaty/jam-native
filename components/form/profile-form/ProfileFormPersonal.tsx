import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import ProfessionsField from "@/components/field/ProfessionsField";
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

      <ProfessionsField
        resource={resource}
        field="professions_ids"
        formData={formData}
        rules={['required']}
        value={formData?.professions_ids || []}
      />

      <ProfileGroupActivities resource={resource} formData={formData} />
    </>
  );
}

export default ProfileFormPersonal;