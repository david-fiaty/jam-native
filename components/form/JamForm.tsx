import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import MediaPickerField from "../field/MediaPickerField";
import LocationPickerField from "../field/LocationPickerField";
import CountryField from "../field/CountryField";
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
import StaticData from "@/constants/StaticData";
import DatePickerField from "../field/DatePickerField";
import LocationTypeField from "../field/LocationTypeField";
import EntityManager from "@/manager/EntityManager";
import CollaboratorsField from "../field/CollaboratorsField";
import DataManager from "@/manager/DataManager";
import MediaManager from "@/manager/MediaManager";
import ModalManager from "@/manager/ModalManager";
import FormManager from "@/manager/FormManager";

type Props = {
  jamId?: any;
};

const resource: string = 'jam';

const JamForm = ({ jamId }: Props) => {
  jamId = jamId || 0;

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const formData = useSelector((state: any) => state.form[resource]);
  const jamCategories = StaticData.jamCategories;

  const submitForm = async () => {
    setIsProcessing(true);
    let media: any = MediaManager.prepareUpload(formData?.upload_medias);

    let result: any = jamId > 0
      ? await EntityManager.updateJam(jamId, { ...formData, ...{ upload_medias: media } })
      : await EntityManager.addJam(formData);

    let message: any = {
      title: jamId > 0 ? i18n.t('Update Jam') : i18n.t('Create Jam'),
      content: i18n.t('Jam data successfully submitted.'),
    };

    if (result?.error) message.content = i18n.t(result.error)
    else FormManager.updateField(resource, null, null);

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
        let profileId: number = await UserManager.getProfileId();
        let jamData: any = jamId == 0 ? formData : await EntityManager.getJams({ items_ids: [jamId] });

        setProfileId(profileId);
        
        FormManager.updateField(resource, null, {
          ...(jamId > 0 ? jamData?.[0] : formData),
          ...{ profile_id: profileId },
          ...{ collaborators: [3] },
        });
      }

      setIsLoaded(true);
    })();
  }, [isLoaded, profileId, resource, formData, jamId]);

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
    >
      <BoxView direction="column" style={[Layout.formContainer, styles.formContainer]}>
        <TextView>{i18n.t('What kind of Jam is it?')}</TextView>
        <ListView
          data={jamCategories}
          numColumns={4}
          horizontal={false}
          scrollEnabled={false}
          contentContainerStyle={Layout.listContainer}
          columnWrapperStyle={Layout.listColumnWrapper}
          renderItem={(row: any) => renderJamCategory(row)}
        />

        <DividerView theme="white" />

        <TextView>{i18n.t('Title')}*</TextView>
        <InputTextField
          value={formData?.title}
          onChangeText={(value: string) => FormManager.updateField(resource, 'title', value, ['required'])}
        />
        {FormManager.renderError('title')}

        <TextView>{i18n.t('Description')}</TextView>
        <InputTextareaField
          value={formData?.caption}
          onChangeText={(value: string) => FormManager.updateField(resource, 'caption', value)}
        />
        {FormManager.renderError('caption')}

        <TextView>{i18n.t('Location type')}</TextView>
        
        <LocationTypeField
          value={formData?.location_type}
          onChangeValue={(option: any) => FormManager.updateField(resource, 'location_type', option.value)}
        />

        <TextView>{i18n.t('Start date')}</TextView>
        <DatePickerField
          value={formData?.period?.start_datetime}
          onChangeValue={(value: any) => FormManager.updateField(resource, 'period', {
            ...(formData?.period || {}),
            ...{ start_datetime: DataManager.formatDate(value) },
          })}
        />

        <TextView>{i18n.t('End date')}</TextView>
        <DatePickerField
          value={formData?.period?.end_datetime}
          onChangeValue={(value: any) => FormManager.updateField(resource, 'period', {
            ...(formData?.period || {}),
            ...{ end_datetime: DataManager.formatDate(value) },
          })}
        />

        <TextView>{i18n.t('Location')}</TextView>
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

        <TextView>{i18n.t('Country')}</TextView>
        <CountryField
          value={formData?.countries}
          onChangeValue={(option: any) => FormManager.updateField(resource, 'country', option.value)}
        />
    
        <TextView>{i18n.t('Select your sectors')}</TextView>
        <SectorsField
          resource={resource}
          field="sectors_ids"
          placeholder={i18n.t('Select your sectors')}
          value={formData?.sectors_ids}
          onChangeValue={(value: string) => FormManager.updateField(resource, 'sectors_ids', value)}
          onPress={() => ModalManager.toggleModal('SectorsList', {
            resource: 'jam',
            field: 'sectors_ids',
          })}
        />

        <DividerView theme="white" />
        
        <CollaboratorsField
          resource={resource}
          field="collaborators_ids"
          onChangeValue={(value: string) => FormManager.updateField(resource, 'collaborators_ids', value)}
          onPress={() => ModalManager.toggleModal('CollaboratorsList', {
            resource: resource,
            field: "collaborators_ids",
          })}
        />

        <DividerView theme="white" />

        <MediaPickerField
          preview={true}
          value={formData?.upload_medias}
          onSelectItem={(data: any) => FormManager.updateField(resource, 'upload_medias', data)}
          onDeleteItem={(data: any) => FormManager.updateField(resource, 'upload_medias', data)}
          label={
            <BoxView direction="row" align="center">
              <IconView name="plus" theme="secondary" radius="round" />
              <TextView>{i18n.t('Add media')}</TextView>
            </BoxView>
          }
        />

        <DividerView theme="white" />
        
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
    backgroundColor: Colors.secondary,
    padding: Layout.space.base,
    borderWidth: Layout.borderWidth.big,
    borderRadius: Layout.radius.round,
    borderColor: Colors.secondary,
    width: Layout.space.base * 7,
    height: Layout.space.base * 7,
  },
  categoryItemSelected: {
    borderColor: Colors.primary,
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
