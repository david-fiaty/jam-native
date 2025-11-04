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

const parentKey: string = 'profile_personal';

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
        parentKey={parentKey}
        rules={['required', 'string']}
        value={formData?.[parentKey]?.first_name || ''}
        placeholder={i18n.t('Enter your first name')}
      />

      <TextView>
        {i18n.t('Last name')}*
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="last_name"
        parentKey={parentKey}
        rules={['required', 'string']}
        value={formData?.[parentKey]?.last_name || ''}
        placeholder={i18n.t('Enter your last name')}
      />

      <TextView>
        {i18n.t('Professions')}*
      </TextView>
      <ProfessionsField
        resource={resource}
        fieldKey="professions_ids"
        parentKey={parentKey}
        rules={['required']}
        value={formData?.[parentKey]?.professions_ids || []}
      />

      <ProfileGroupActivities 
        resource={resource} 
        formData={formData} 
        parentKey={parentKey}
      />
    </>
  );
}

export default ProfileFormPersonal;