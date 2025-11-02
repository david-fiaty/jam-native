import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import FormManager from "@/manager/FormManager";
import OrganizationTypesField from "@/components/field/OrganizationTypesField";
import ProfileGroupDocuments from "./groups/ProfileGroupDocuments";
import GroupTitleView from "@/components/view/GroupTitleView";
import ProfileGroupActivities from "./groups/ProfileGroupActivities";

type Props = {
  resource: any;
  formData: any;
};

const ProfileFormOrganization = ({ resource, formData }: Props) => {

  //console.log(formData?.profile_organization?.organization_types)
  
  return (
    <>
      <GroupTitleView label={i18n.t("Organization information")} />

      <TextView>
        {i18n.t('Organization name')}*
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="organization_name"
        parentKey="profile_organization"
        formData={formData}
        rules={['required', 'string']}
        value={formData?.profile_organization?.organization_name || ''}
        placeholder={i18n.t('Enter your organization name')}
      />

      <TextView>
        {i18n.t('Organization types')}
      </TextView>
      <OrganizationTypesField
        resource={resource}
        fieldKey="organization_types"
        parentKey="profile_organization"
        formData={formData}
        rules={['required']}
        placeholder={i18n.t('Select organization types')}
        value={formData?.profile_organization?.organization_types || []}
      />

      <TextView>
        {i18n.t('Creation year')}*
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="creation_year"
        parentKey="profile_organization"
        rules={['required', 'number']}
        formData={formData}
        keyboardType="number-pad"
        value={formData?.profile_organization?.creation_year || ''}
        placeholder={i18n.t('Enter the creation year')}
      />

      <ProfileGroupActivities resource={resource} formData={formData} />

      <ProfileGroupDocuments resource={resource} formData={formData} />
    </>
  );
}

export default ProfileFormOrganization;