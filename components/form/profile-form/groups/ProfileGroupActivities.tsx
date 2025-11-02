import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import GroupTitleView from "@/components/view/GroupTitleView";
import SectorsField from "@/components/field/SectorsField";
import FormManager from "@/manager/FormManager";
import ModalManager from "@/manager/ModalManager";
import CulturalActivityTypesField from "@/components/field/CulturalActivityTypesField";

type Props = {
  resource: any;
  formData: any;
};

const ProfileGroupActivities = ({ resource, formData }: Props) => {
  return (
    <>
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
        value={formData?.profile_organization?.other_cultural_activities || ''}
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

export default ProfileGroupActivities;