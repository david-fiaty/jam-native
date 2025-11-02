import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import FormManager from "@/manager/FormManager";
import VenueTypesField from "@/components/field/VenueTypesField";
import DatePickerField from "@/components/field/DatePickerField";
import InputSwitchField from "@/components/field/InputSwitchField";
import DataManager from "@/manager/DataManager";
import ProfileGroupDocuments from "./groups/ProfileGroupDocuments";
import GroupTitleView from "@/components/view/GroupTitleView";
import ProfileGroupActivities from "./groups/ProfileGroupActivities";
import WeekDaysField from "@/components/field/WeekDaysField";

type Props = {
  resource: any;
  formData: any;
};

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
        parentKey="profile_venue"
        rules={['required', 'string']}
        value={formData?.profile_venue?.venue_name || ''}
        placeholder={i18n.t('Enter the venue name')}
      />

      <TextView>
        {i18n.t('Venue types')}*
      </TextView>
      <VenueTypesField
        resource={resource}
        fieldKey="venue_types"
        parentKey="profile_venue"
        rules={['required']}
        placeholder={i18n.t('Select venue types')}
        value={formData?.profile_venue?.venue_types || []}
      />

      <TextView>
        {i18n.t('Other venue types')}
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="other_venue_types"
        parentKey="profile_venue"
        rules={['string']}
        value={formData?.profile_venue?.other_venue_types || ''}
        placeholder={i18n.t('Enter other venue types')}
      />

      <TextView>
        {i18n.t('Creation year')}
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="creation_year"
        parentKey="profile_venue"
        rules={['number']}
        keyboardType="number-pad"
        value={formData?.profile_venue?.creation_year || ''}
        placeholder={i18n.t('Enter the creation year')}
      />

      <GroupTitleView label={i18n.t("Venue details")} />

      <TextView>
        {i18n.t('Opening days')}
      </TextView>
      <WeekDaysField
        resource={resource}
        fieldKey="opening_days"
        parentKey="profile_venue"
        rules={['required']}
        placeholder={i18n.t('Enter the opening days')}
        value={formData?.profile_venue?.opening_days || []}
      />

      <TextView>
        {i18n.t('Weekdays opening hour')}
      </TextView>
      <DatePickerField
        mode="time"
        value={formData?.profile_venue?.opening_hour_weekdays || ''}
        placeholder={i18n.t('Weekdays opening hour')}
        onChangeValue={(value: any) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ opening_hour_weekdays: DataManager.toDbTime(value)},
        })}
      />
      {FormManager.renderError('profile_venue.opening_hour_weekdays')}

      <TextView>
        {i18n.t('Weekdays closing hour')}
      </TextView>
      <DatePickerField
        mode="time"
        value={formData?.profile_venue?.closing_hour_weekdays || ''}
        placeholder={i18n.t('Weekdays closing hour')}
        onChangeValue={(value: any) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ closing_hour_weekdays: DataManager.toDbTime(value) },
        })}
      />
      {FormManager.renderError('profile_venue.closing_hour_weekdays')}

      <TextView>
        {i18n.t('Weekend opening hour')}
      </TextView>
      <DatePickerField
        mode="time"
        value={formData?.profile_venue?.opening_hour_weekend || ''}
        placeholder={i18n.t('Weekends opening hour')}
        onChangeValue={(value: any) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ opening_hour_weekend: DataManager.toDbTime(value) },
        })}
      />
      {FormManager.renderError('profile_venue.opening_hour_weekend')}

      <TextView>
        {i18n.t('Weekend closing hour')}
      </TextView>
      <DatePickerField
        mode="time"
        value={formData?.profile_venue?.closing_hour_weekend || ''}
        placeholder={i18n.t('Weekends closing hour')}
        onChangeValue={(value: any) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ closing_hour_weekend: DataManager.toDbTime(value) },
        })}
      />
      {FormManager.renderError('profile_venue.closing_hour_weekend')}

      <InputSwitchField
        value={formData?.profile_venue?.has_creation_space || false}
        label={i18n.t('Has creation space')}
        onChangeValue={(value: any) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ has_creation_space: value },
        }, [])}
      />
      {FormManager.renderError('profile_venue.has_creation_space')}

      <InputSwitchField
        value={formData?.profile_venue?.has_diffusion_space || false}
        label={i18n.t('Has diffusion space')}
        onChangeValue={(value: any) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ has_diffusion_space: value },
        }, [])}
      />
      {FormManager.renderError('profile_venue.has_diffusion_space')}

      <ProfileGroupActivities resource={resource} formData={formData} />

      <ProfileGroupDocuments resource={resource} formData={formData} />
    </>
  );
}

export default ProfileFormVenue;