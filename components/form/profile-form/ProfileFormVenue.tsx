import React from "react";
import i18n from "@/translation/i18n";
import InputTextField from "@/components/field/InputTextField";
import VenueTypesField from "@/components/field/VenueTypesField";
import DatePickerField from "@/components/field/DatePickerField";
import InputSwitchField from "@/components/field/InputSwitchField";
import ProfileGroupDocuments from "./groups/ProfileGroupDocuments";
import GroupTitleView from "@/components/view/GroupTitleView";
import ProfileGroupActivities from "./groups/ProfileGroupActivities";
import WeekDaysField from "@/components/field/WeekDaysField";

type Props = {
  resource: any;
  formData: any;
};

const parentKey: string = 'profile_venue';

const ProfileFormVenue = ({ resource, formData }: Props) => {
  return (
    <>
      <GroupTitleView label={i18n.t("Venue information")} />

      <InputTextField
        resource={resource}
        fieldKey="venue_name"
        parentKey={parentKey}
        rules={['required', 'string']}
        value={formData?.[parentKey]?.venue_name || ''}
        label={i18n.t('Venue name')}
        placeholder={i18n.t('Enter the venue name')}
      />

      <VenueTypesField
        resource={resource}
        fieldKey="venue_types"
        parentKey={parentKey}
        rules={['required']}
        placeholder={i18n.t('Select venue types')}
        label={i18n.t('Venue types')}
        value={formData?.[parentKey]?.venue_types || []}
      />

      <InputTextField
        resource={resource}
        fieldKey="other_venue_types"
        parentKey={parentKey}
        rules={['string']}
        value={formData?.[parentKey]?.other_venue_types || ''}
        label={i18n.t('Other venue types')}
        placeholder={i18n.t('Enter other venue types')}
      />

      <InputTextField
        resource={resource}
        fieldKey="creation_year"
        parentKey={parentKey}
        rules={['number']}
        keyboardType="number-pad"
        value={formData?.[parentKey]?.creation_year || ''}
        label={i18n.t('Creation year')}
        placeholder={i18n.t('Enter the creation year')}
      />

      <GroupTitleView label={i18n.t("Venue details")} />

      <WeekDaysField
        resource={resource}
        fieldKey="opening_days"
        parentKey={parentKey}
        rules={['required']}
        placeholder={i18n.t('Enter the opening days')}
        label={i18n.t('Opening days')}
        value={formData?.[parentKey]?.opening_days || []}
      />

      <DatePickerField
        mode="time"
        resource={resource}
        fieldKey="opening_hour_weekdays"
        parentKey={parentKey}
        value={formData?.[parentKey]?.opening_hour_weekdays || ''}
        label={i18n.t('Weekdays opening hour')}
        placeholder={i18n.t('Weekdays opening hour')}
      />

      <DatePickerField
        mode="time"
        resource={resource}
        fieldKey="closing_hour_weekdays"
        parentKey={parentKey}
        value={formData?.[parentKey]?.closing_hour_weekdays || ''}
        label={i18n.t('Weekdays closing hour')}
        placeholder={i18n.t('Weekdays closing hour')}
      />

      <DatePickerField
        mode="time"
        resource={resource}
        fieldKey="opening_hour_weekend"
        parentKey={parentKey}
        value={formData?.[parentKey]?.opening_hour_weekend || ''}
        label={i18n.t('Weekend opening hour')}
        placeholder={i18n.t('Weekends opening hour')}
      />

      <DatePickerField
        mode="time"
        resource={resource}
        fieldKey="closing_hour_weekend"
        parentKey={parentKey}
        value={formData?.[parentKey]?.closing_hour_weekend || ''}
        label={i18n.t('Weekend closing hour')}
        placeholder={i18n.t('Weekends closing hour')}
      />

      <InputSwitchField
        resource={resource}
        fieldKey="has_creation_space"
        parentKey={parentKey}
        value={formData?.[parentKey]?.has_creation_space || false}
        label={i18n.t('Has creation space')}
      />

      <InputSwitchField
        resource={resource}
        fieldKey="has_diffusion_space"
        parentKey={parentKey}
        value={formData?.[parentKey]?.has_diffusion_space || false}
        label={i18n.t('Has diffusion space')}
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

export default ProfileFormVenue;