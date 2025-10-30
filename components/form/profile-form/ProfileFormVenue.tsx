import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import ModalManager from "@/manager/ModalManager";
import FormManager from "@/manager/FormManager";
import VenueTypesField from "@/components/field/VenueTypesField";
import CulturalActivityTypesField from "@/components/field/CulturalActivityTypesField";
import DatePickerField from "@/components/field/DatePickerField";
import InputSwitchField from "@/components/field/InputSwitchField";
import DataManager from "@/manager/DataManager";
import WeekdaysField from "@/components/field/WeekdaysField";
import ProfileGroupManagement from "./groups/ProfileGroupManagement";
import ProfileGroupDocuments from "./groups/ProfileGroupDocuments";
import SectorsField from "@/components/field/SectorsField";

type Props = {
  resource: any;
  formData: any;
};

const ProfileFormVenue = ({ resource, formData }: Props) => {
  return (
    <>
      <TextView style={styles.groupTitle}>
        {i18n.t("Venue information")}
      </TextView>

      <TextView>
        {i18n.t('Venue name')}*
      </TextView>
      <InputTextField
        value={formData?.profile_venue?.venue_name}
        placeholder={i18n.t('Enter the venue name')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ venue_name: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_venue.venue_name')}

      <TextView>
        {i18n.t('Venue types')}*
      </TextView>
      <VenueTypesField
        resource={resource}
        field="venue_types"
        parent="profile_venue"
        placeholder={i18n.t('Select venue types')}
        value={formData?.profile_venue?.venue_types}
        onPress={() => ModalManager.toggleModal('VenueTypesList', {
          resource: resource,
          field: "venue_types",
          parent: "profile_venue",
        })}
      />
      {FormManager.renderError('profile_venue.venue_types')}

      <TextView>
        {i18n.t('Other venue types')}
      </TextView>
      <InputTextField
        value={formData?.profile_venue?.other_venue_types}
        placeholder={i18n.t('Enter other venue types')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ other_venue_types: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_venue.other_venue_types')}

      <TextView style={styles.groupTitle}>
        {i18n.t("Sectors and activities")}
      </TextView>

      <TextView>
        {i18n.t('Main cultural activities')}
      </TextView>
      <CulturalActivityTypesField
        resource={resource}
        field="main_cultural_activities"
        parent="profile_venue"
        placeholder={i18n.t('Select cultural activities')}
        value={formData?.profile_venue?.main_cultural_activities}
        onPress={() => ModalManager.toggleModal('CulturalActivityTypesList', {
          resource: resource,
          field: "main_cultural_activities",
          parent: "profile_venue",
        })}
      />
      {FormManager.renderError('profile_venue.main_cultural_activities')}

      <TextView>
        {i18n.t('Other cultural activities')}
      </TextView>
      <InputTextField
        value={formData?.profile_venue?.other_cultural_activities}
        placeholder={i18n.t('Enter other cultural activities')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ other_cultural_activities: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_venue.other_cultural_activities')}

      <TextView>
        {i18n.t('Creation year')}
      </TextView>
      <InputTextField
        keyboardType="number-pad"
        value={formData?.profile_venue?.creation_year}
        placeholder={i18n.t('Enter the creation year')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ creation_year: value },
        }, ['number'])}
      />
      {FormManager.renderError('profile_venue.creation_year')}

      <SectorsField
        resource={resource}
        field="sectors_ids"
        value={formData?.sectors_ids}
      />

      <TextView style={styles.groupTitle}>
        {i18n.t("Venue details")}
      </TextView>

      <TextView>
        {i18n.t('Opening days')}
      </TextView>
      <WeekdaysField
        resource={resource}
        field={'opening_days'}
        value={formData?.profile_venue?.opening_days}
        placeholder={i18n.t('Enter the opening days')}
        /*
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ opening_days: value },
        }, ['string'])}
        */
      />


      {/*
      <InputTextField
        value={formData?.profile_venue?.opening_days}
        placeholder={i18n.t('Enter the opening days')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ opening_days: value },
        }, ['string'])}
      />
      {FormManager.renderError('profile_venue.opening_days')}
      */}

      <TextView>
        {i18n.t('Weekdays opening hour')}
      </TextView>
      <DatePickerField
        mode="time"
        value={formData?.profile_venue?.opening_hour_weekdays}
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
        value={formData?.profile_venue?.closing_hour_weekdays}
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
        value={formData?.profile_venue?.opening_hour_weekend}
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
        value={formData?.profile_venue?.closing_hour_weekend}
        placeholder={i18n.t('Weekends closing hour')}
        onChangeValue={(value: any) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ closing_hour_weekend: DataManager.toDbTime(value) },
        })}
      />
      {FormManager.renderError('profile_venue.closing_hour_weekend')}

      <InputSwitchField
        value={formData?.profile_venue?.has_creation_space}
        label={i18n.t('Has creation space')}
        onChangeValue={(value: any) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ has_creation_space: value },
        }, [])}
      />
      {FormManager.renderError('profile_venue.has_creation_space')}

      <InputSwitchField
        value={formData?.profile_venue?.has_diffusion_space}
        label={i18n.t('Has diffusion space')}
        onChangeValue={(value: any) => FormManager.updateField(resource, 'profile_venue', {
          ...(formData?.profile_venue || {}),
          ...{ has_diffusion_space: value },
        }, [])}
      />
      {FormManager.renderError('profile_venue.has_diffusion_space')}

      <ProfileGroupDocuments resource={resource} formData={formData} />
    </>
  );
}

const styles = StyleSheet.create({
  groupTitle: {
    fontWeight: 'bold',
    marginTop: Layout.space.base * 1.5,
  },
});

export default ProfileFormVenue;