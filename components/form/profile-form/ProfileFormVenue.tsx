import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
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

      <TextView>
        {i18n.t('Venue name')}*
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="venue_name"
        parentKey={parentKey}
        rules={['required', 'string']}
        value={formData?.[parentKey]?.venue_name || ''}
        placeholder={i18n.t('Enter the venue name')}
      />

      <TextView>
        {i18n.t('Venue types')}*
      </TextView>
      <VenueTypesField
        resource={resource}
        fieldKey="venue_types"
        parentKey={parentKey}
        rules={['required']}
        placeholder={i18n.t('Select venue types')}
        value={formData?.[parentKey]?.venue_types || []}
      />

      <TextView>
        {i18n.t('Other venue types')}
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="other_venue_types"
        parentKey={parentKey}
        rules={['string']}
        value={formData?.[parentKey]?.other_venue_types || ''}
        placeholder={i18n.t('Enter other venue types')}
      />

      <TextView>
        {i18n.t('Creation year')}
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="creation_year"
        parentKey={parentKey}
        rules={['number']}
        keyboardType="number-pad"
        value={formData?.[parentKey]?.creation_year || ''}
        placeholder={i18n.t('Enter the creation year')}
      />

      <GroupTitleView label={i18n.t("Venue details")} />

      <TextView>
        {i18n.t('Opening days')}
      </TextView>
      <WeekDaysField
        resource={resource}
        fieldKey="opening_days"
        parentKey={parentKey}
        rules={['required']}
        placeholder={i18n.t('Enter the opening days')}
        value={formData?.[parentKey]?.opening_days || []}
      />

      <TextView>
        {i18n.t('Weekdays opening hour')}
      </TextView>
      <DatePickerField
        mode="time"
        resource={resource}
        fieldKey="opening_hour_weekdays"
        parentKey={parentKey}
        value={formData?.[parentKey]?.opening_hour_weekdays || ''}
        placeholder={i18n.t('Weekdays opening hour')}
      />

      <TextView>
        {i18n.t('Weekdays closing hour')}
      </TextView>
      <DatePickerField
        mode="time"
        resource={resource}
        fieldKey="closing_hour_weekdays"
        parentKey={parentKey}
        value={formData?.[parentKey]?.closing_hour_weekdays || ''}
        placeholder={i18n.t('Weekdays closing hour')}
      />

      <TextView>
        {i18n.t('Weekend opening hour')}
      </TextView>
      <DatePickerField
        mode="time"
        resource={resource}
        fieldKey="opening_hour_weekend"
        parentKey={parentKey}
        value={formData?.[parentKey]?.opening_hour_weekend || ''}
        placeholder={i18n.t('Weekends opening hour')}
      />

      <TextView>
        {i18n.t('Weekend closing hour')}
      </TextView>
      <DatePickerField
        mode="time"
        resource={resource}
        fieldKey="closing_hour_weekend"
        parentKey={parentKey}
        value={formData?.[parentKey]?.closing_hour_weekend || ''}
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