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

type Props = {
  resource: any;
  formData: any;
};

const ProfileFormVenue = ({ resource, formData }: Props) => {
  return (
    <>
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

      <TextView style={styles.groupTitle}>
        {i18n.t("Venue details")}
      </TextView>



    </>
  );
}

const styles = StyleSheet.create({
  groupTitle: {
    fontWeight: 'bold',
    marginTop: Layout.space.base*1.5,
  },
});

export default ProfileFormVenue;