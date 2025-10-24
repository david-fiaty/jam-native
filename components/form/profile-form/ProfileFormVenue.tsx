import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { setFormData } from "@/redux/slices/FormSlice";
import ProfileImageField from "@/components/field/ProfileImageField";
import ButtonView from "@/components/view/ButtonView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import ScreenManager from "@/manager/ScreenManager";
import SpinnerView from "@/components/view/SpinnerView";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import InputTextareaField from "@/components/field/InputTextareaField";
import SectorsField from "@/components/field/SectorsField";
import ModalManager from "@/manager/ModalManager";
import LocationPickerField from "@/components/field/LocationPickerField";
import ProfileTypeField from "@/components/field/ProfileTypeField";
import FormManager from "@/manager/FormManager";
import BoxView from "@/components/view/BoxView";
import VenueTypesField from "@/components/field/VenueTypesField";
import CountriesField from "@/components/field/CountriesField";
import OrganizationTypesField from "@/components/field/OrganizationTypesField";
import CulturalActivityTypesField from "@/components/field/CulturalActivityTypesField";
import ProfessionsField from "@/components/field/ProfessionsField";

const resource: string = 'profile';

type Props = {
  formData: any;
};

const ProfileFormVenue = ({ formData }: Props) => {
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
    </>
  );
}

export default ProfileFormVenue;