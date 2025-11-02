import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import OrganizationTypesField from "@/components/field/OrganizationTypesField";
import ProfileGroupDocuments from "./groups/ProfileGroupDocuments";
import GroupTitleView from "@/components/view/GroupTitleView";
import ProfileGroupActivities from "./groups/ProfileGroupActivities";

type Props = {
  resource: any;
  formData: any;
};

const parentKey: string = 'profile_organization';

const ProfileFormOrganization = ({ resource, formData }: Props) => {  
  return (
    <>
      <GroupTitleView label={i18n.t("Organization information")} />

      <TextView>
        {i18n.t('Organization name')}*
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="organization_name"
        parentKey={parentKey}
        rules={['required', 'string']}
        value={formData?.[parentKey]?.organization_name || ''}
        placeholder={i18n.t('Enter your organization name')}
      />

      <TextView>
        {i18n.t('Organization types')}
      </TextView>
      <OrganizationTypesField
        resource={resource}
        fieldKey="organization_types"
        parentKey={parentKey}
        rules={['required']}
        placeholder={i18n.t('Select organization types')}
        value={formData?.[parentKey]?.organization_types || []}
      />

      <TextView>
        {i18n.t('Creation year')}*
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="creation_year"
        parentKey={parentKey}
        rules={['required', 'number']}
        keyboardType="number-pad"
        value={formData?.[parentKey]?.creation_year || ''}
        placeholder={i18n.t('Enter the creation year')}
      />

      <ProfileGroupActivities 
        resource={resource} 
        formData={formData} 
        parentKey={parentKey}
      />

      <ProfileGroupDocuments 
        resource={resource} 
        formData={formData} 
        parentKey={parentKey}
      />
    </>
  );
}

export default ProfileFormOrganization;