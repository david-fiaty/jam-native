import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import ModalManager from "@/manager/ModalManager";
import FormManager from "@/manager/FormManager";
import OrganizationTypesField from "@/components/field/OrganizationTypesField";
import CulturalActivityTypesField from "@/components/field/CulturalActivityTypesField";
import ProfileGroupDocuments from "./groups/ProfileGroupDocuments";
import SectorsField from "@/components/field/SectorsField";
import GroupTitleView from "@/components/view/GroupTitleView";

type Props = {
  resource: any;
  formData: any;
};

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
        rules={['required']}
        placeholder={i18n.t('Select organization types')}
        value={formData?.profile_organization?.organization_types || []}
        onPress={() => ModalManager.toggleModal('OrganizationTypesList', {
          resource: resource,
          field: "organization_types",
          parent: "profile_organization",
        })}
      />
      {FormManager.renderError('profile_organization.organization_types')}

      <GroupTitleView label={i18n.t("Sectors and activities")} />

      <TextView>
        {i18n.t('Main cultural activities')}
      </TextView>
      <CulturalActivityTypesField
        resource={resource}
        field="main_cultural_activities"
        parent="profile_organization"
        placeholder={i18n.t('Select cultural activities')}
        value={formData?.profile_organization?.main_cultural_activities || []}
        onPress={() => ModalManager.toggleModal('CulturalActivityTypesList', {
          resource: resource,
          field: "main_cultural_activities",
          parent: "profile_organization",
        })}
      />
      {FormManager.renderError('profile_organization.main_cultural_activities')}

      <TextView>
        {i18n.t('Other cultural activities')}
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="other_cultural_activities"
        parentKey="profile_organization"
        rules={['string']}
        formData={formData}
        value={formData?.profile_organization?.other_cultural_activities || ''}
        placeholder={i18n.t('Enter other cultural activities')}
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

      <SectorsField
        resource={resource}
        field="sectors_ids"
        value={formData?.sectors_ids || []}
      />

      <ProfileGroupDocuments resource={resource} formData={formData} />
    </>
  );
}

export default ProfileFormOrganization;