import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import GroupTitleView from "@/components/view/GroupTitleView";
import SectorsField from "@/components/field/SectorsField";
import CulturalActivitiesField from "@/components/field/CulturalActivitiesField";

type Props = {
  resource: any;
  formData: any;
  parentKey?: any;
};

const ProfileGroupActivities = ({ resource, formData, parentKey }: Props) => {
  return (
    <>
      <GroupTitleView label={i18n.t("Sectors and activities")} />

      <TextView>
        {i18n.t('Main cultural activities')}
      </TextView>
      <CulturalActivitiesField
        resource={resource}
        fieldKey="main_cultural_activities"
        parentKey={parentKey}
        rules={['required']}
        placeholder={i18n.t('Select cultural activities')}
        value={formData?.[parentKey]?.main_cultural_activities || []}
      />

      <TextView>
        {i18n.t('Other cultural activities')}
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="other_cultural_activities"
        parentKey={parentKey}
        rules={['string']}
        value={formData?.[parentKey]?.other_cultural_activities || ''}
        placeholder={i18n.t('Enter other cultural activities')}
      />   

      <SectorsField
        resource={resource}
        fieldKey="sectors_ids"
        childrenKey="sub_sectors"
        rules={['required']}
        value={formData?.sectors_ids || []}
        listLabel={i18n.t('Activity sectors')}
        listPlaceholder={i18n.t('Select your sectors')}
        subListLabel={i18n.t('Activity sub sectors')}
        subListPlaceholder={i18n.t('Select your sub sectors')}
      />
    </>
  );
}

export default ProfileGroupActivities;