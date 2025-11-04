import React from "react";
import i18n from "@/translation/i18n";
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

      <InputTextField
        resource={resource}
        fieldKey="first_name"
        parentKey={parentKey}
        rules={['required', 'string']}
        value={formData?.[parentKey]?.first_name || ''}
        label={i18n.t('First name')}
        placeholder={i18n.t('Enter your first name')}
      />

      <InputTextField
        resource={resource}
        fieldKey="last_name"
        parentKey={parentKey}
        rules={['required', 'string']}
        value={formData?.[parentKey]?.last_name || ''}
        label={i18n.t('Last name')}
        placeholder={i18n.t('Enter your last name')}
      />

      <ProfessionsField
        resource={resource}
        fieldKey="professions_ids"
        parentKey={parentKey}
        childrenKey="sub_professions"
        rules={['required']}
        value={formData?.[parentKey]?.professions_ids || []}
        listLabel={i18n.t('Professions')}
        listPlaceholder={i18n.t('Select your professions')}
        subListLabel={i18n.t('Sub professions')}
        subListPlaceholder={i18n.t('Select your sub professions')}
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