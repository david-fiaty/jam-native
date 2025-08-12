import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import MediaPickerField from "../field/MediaPickerField";
import LocationPickerField from "../field/LocationPickerField";
import SectorsField from "../field/SectorsField";
import DividerView from "../view/DividerView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import ButtonView from "../view/ButtonView";
import IconView from "../view/IconView";
import TextView from "../view/TextView";
import ListView from "../view/ListView";
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import UserManager from "@/manager/UserManager";
import DatePickerField from "../field/DatePickerField";
import LocationTypeField from "../field/LocationTypeField";
import EntityManager from "@/manager/EntityManager";
import CollaboratorsField from "../field/CollaboratorsField";
import DataManager from "@/manager/DataManager";
import MediaManager from "@/manager/MediaManager";
import ModalManager from "@/manager/ModalManager";
import FormManager from "@/manager/FormManager";
import CountriesField from "../field/CountriesField";

type Props = {
  jamId?: any;
};

const resource: string = 'jam';

const JamForm = ({ jamId }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const formData = useSelector((state: any) => state.form[resource]);
  const jamCategories: any = [
    {
      id: 'call',
      label: i18n.t('Call'),
      icon: 'megaphone',
    },
    {
      id: 'looking',
      label: i18n.t('Looking'),
      icon: 'link',
    },
    {
      id: 'event',
      label: i18n.t('Event'),
      icon: 'users',
    },
    {
      id: 'random',
      label: i18n.t('Random'),
      icon: 'infinite',
    },
  ];

  const submitForm = async () => {
    setIsProcessing(true);

    // Todo - Handle media
    //let media: any = MediaManager.prepareUpload(formData?.upload_medias); 

    let message: any = {
      title: i18n.t('Create Jam'),
      content: i18n.t('Jam data successfully submitted.'),
    };

    let result: any = await EntityManager.addJam(formData);

    if (result.success === false) {
      message.content = i18n.t('Invalid data submission.');
      FormManager.addServerErrors(resource, result.response);
    }

    ScreenManager.showMessage(message);
    setIsProcessing(false);
  };

  const renderJamCategory = (row: any) => (
    <TouchableOpacity onPress={() => FormManager.updateField(resource, 'type', row.item.id)}>
      <View style={styles.categoryContainer}>
        <View
          style={[
            styles.categoryItem,
            formData?.type == row.item.id ? styles.categoryItemSelected : {},
          ]}
        >
          <IconView name={row.item.icon} theme="secondary" />
        </View>
        <TextView>{row.item.label}</TextView>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        //FormManager.resetForm(resource); // Todo - Fix form reset on web
        let profileId: number = await UserManager.getProfileId();
        setProfileId(profileId);

        let jamData: any = (await EntityManager.getJams([jamId]))?.[0] || {};

        dispatch(setFormData<any>({
          resource: resource,
          key: null,
          value: {
            ...jamData,
            ...{ profile_id: profileId },
          },
        }));

        setIsLoaded(true);
      }
    })();

  }, [isLoaded, profileId, jamId, resource]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={[Layout.formContainer, styles.container]}
    >
      <BoxView direction="column" style={[Layout.formContainer, styles.formContainer]}>
        <TextView>{i18n.t('What kind of Jam is it?')} *</TextView>
        <ListView
          data={jamCategories}
          numColumns={4}
          horizontal={false}
          scrollEnabled={false}
          contentContainerStyle={Layout.listContainer}
          columnWrapperStyle={Layout.listColumnWrapper}
          renderItem={(row: any) => renderJamCategory(row)}
        />
        {FormManager.renderError('type')}

        <DividerView theme="white" />

        <TextView>{i18n.t('Title')} *</TextView>
        <InputTextField
          value={formData?.title}
          onChangeText={(value: string) => FormManager.updateField(resource, 'title', value, ['string'])}
        />
        {FormManager.renderError('title')}

        <TextView>{i18n.t('Description')} *</TextView>
        <InputTextareaField
          value={formData?.caption}
          onChangeText={(value: string) => FormManager.updateField(resource, 'caption', value, ['string'])}
        />
        {FormManager.renderError('caption')}

        <TextView>{i18n.t('Select media')} *</TextView>
        <MediaPickerField
          preview={true}
          value={formData?.upload_medias}
          onSelectItem={(data: any) => FormManager.updateField(resource, 'upload_medias', data, ['array'])}
          onDeleteItem={(data: any) => FormManager.updateField(resource, 'upload_medias', data, ['array'])}
        />
        {FormManager.renderError('upload_medias')}

        <TextView>{i18n.t('Location type')} *</TextView>
        <LocationTypeField
          value={formData?.location_type}
          onChangeValue={(option: any) => FormManager.updateField(resource, 'location_type', option.value, ['string'])}
        />
        {FormManager.renderError('location_type')}

        {['physical', 'online_physical'].includes(formData?.location_type) && (
          <>
            <TextView>{i18n.t('Location')} *</TextView>
            <LocationPickerField
              resource={resource}
              placeholder={i18n.t('Select your location')}
              onChangeValue={(data: any) => {
                FormManager.updateField(resource, 'geolocation_latitude', data?.geolocation_latitude);
                FormManager.updateField(resource, 'geolocation_longitude', data?.geolocation_longitude);
              }}
              onPress={() => ModalManager.toggleModal('LocationMapView', {
                resource: resource,
                latitude: {
                  field: 'geolocation_latitude',
                  value: formData?.geolocation_latitude,
                },
                longitude: {
                  field: 'geolocation_longitude',
                  value: formData?.geolocation_longitude,
                },
              })}
              latitude={{
                field: 'geolocation_latitude',
                value: formData?.geolocation_latitude,
              }}
              longitude={{
                field: 'geolocation_longitude',
                value: formData?.geolocation_longitude,
              }}
            />
            {FormManager.renderError('geolocation_latitude')}
          </>
        )}

        <TextView>{i18n.t('Start date')}</TextView>
        <DatePickerField
          value={formData?.period?.start_datetime}
          onChangeValue={(value: any) => FormManager.updateField(resource, 'period', {
            ...(formData?.period || {}),
            ...{ start_datetime: DataManager.formatDate(value) },
          }, ['date'])}
        />
        {FormManager.renderError('period')}

        <TextView>{i18n.t('End date')}</TextView>
        <DatePickerField
          value={formData?.period?.end_datetime}
          onChangeValue={(value: any) => FormManager.updateField(resource, 'period', {
            ...(formData?.period || {}),
            ...{ end_datetime: DataManager.formatDate(value) },
          }, ['date'])}
        />
        {FormManager.renderError('period')}

        <TextView>{i18n.t('Country')}</TextView>
        <CountriesField
          multiple={false}
          resource={resource}
          field="country"
          placeholder={i18n.t('Select a country')}
          value={formData?.country}
          onPress={() => ModalManager.toggleModal('CountriesList', {
            resource: resource,
            field: 'country',
            multiple: false,
          })}
        />
        {FormManager.renderError('country')}

        <SectorsField
          resource={resource}
          field="sectors_ids"
          value={formData?.sectors_ids}
        />

        <TextView>{i18n.t('Select collaborators')}</TextView>
        <CollaboratorsField
          resource={resource}
          field="collaborators_ids"
          placeholder={i18n.t('Select collaborators')}
          value={formData?.collaborators_ids}
          onPress={() => ModalManager.toggleModal('CollaboratorsList', {
            resource: resource,
            field: "collaborators_ids",
          })}
        />
        {FormManager.renderError('collaborators_ids')}

        <View style={styles.submitButtonContainer}>
          <ButtonView
            label={i18n.t('Post')}
            isProcessing={isProcessing}
            onPress={submitForm}
          />
        </View>

        <DividerView />
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    maxWidth: '100%',
    flexShrink: 1,
    paddingTop: Layout.space.base,
  },
  categoryContainer: {
    flexDirection: 'column',
    gap: Layout.space.small,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Layout.colors.secondary,
    padding: Layout.space.base,
    borderWidth: Layout.borderWidth.big,
    borderRadius: Layout.radius.round,
    borderColor: Layout.colors.secondary,
    width: Layout.space.base * 7,
    height: Layout.space.base * 7,
  },
  categoryItemSelected: {
    borderColor: Layout.colors.primary,
  },
  fieldContainer: {
    maxWidth: '100%',
    flexShrink: 1,
  },
  submitButtonContainer: {
    marginBottom: Layout.space.base,
  },
});

export default JamForm;
