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

type Props = {
  jamId?: any;
};

const JamForm = ({ jamId } : Props) => {

  console.log('--->', jamId);
  return <></>;









  const resource: string = 'jam';
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const formData = useSelector((state: any) => state.form[resource]);
  const activeModal = ScreenManager.getActiveModal();
  const jamCategoriesData = StaticData.jamCategories;
  const entityId = activeModal?.params?.entityId || 0;

  const sectorsFieldName: string = entityId == 0 ? 'sectors_ids' : 'sectors';
  const collaboratorsFieldName: string = entityId == 0 ? 'collaborators_ids' : 'collaborators';
  const mediasFieldName: string = entityId == 0 ? 'upload_medias' : 'medias';

  const updateField = (key: any, value: any) => {
    dispatch(setFormData<any>({ 
      resource: resource,
      key: key, 
      value: value, 
      profile_id: profileId,
    }));
  };

  const submitForm = async () => {
    setIsProcessing(true);
    let media: any = MediaManager.prepareUpload(formData?.[mediasFieldName]);

    let result: any = entityId > 0 
      ? await EntityManager.updateJam(entityId, {...formData, ...{ [mediasFieldName]: media}}) 
      : await EntityManager.addJam(formData);

    let message: any = {
      title: entityId > 0 ? i18n.t('Update Jam') : i18n.t('Create Jam'),
      content: i18n.t('Jam data successfully submitted.'),
    };

    if (result?.error) message.content = i18n.t(result.error)
    else updateField(null, null)

    ScreenManager.showMessage(message);
    setIsProcessing(false);
  };

  const renderJamCategory = (row: any) => (
    <TouchableOpacity onPress={() => updateField('type', row.item.id)}>
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
        let profileId: number =  await UserManager.getProfileId();
        let jamData: any = entityId == 0 ? formData : await EntityManager.getJams({ items_ids: [entityId] });

        setProfileId(profileId);
        dispatch(setFormData<any>({ 
          resource: resource,
          key: null, 
          value: {
            ...(entityId > 0 ? jamData?.[0] : formData),
            ...{ profile_id: profileId },
            ...{ collaborators: [3]}
          }, 
        }));
      }

      setIsLoaded(true);
    })();
  }, [isLoaded, profileId, resource, formData]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <BoxView direction="column" style={Layout.formContainer}>
        <TextView>{i18n.t('What kind of Jam is it?')}</TextView>
        <ListView
          data={jamCategoriesData}
          numColumns={4}
          horizontal={false}
          scrollEnabled={false}
          contentContainerStyle={Layout.listContainer}
          columnWrapperStyle={Layout.listColumnWrapper}
          renderItem={(row: any) => renderJamCategory(row)}
        />

        <DividerView />

        <TextView>{i18n.t('Title')}</TextView>
        <InputTextField
          value={formData?.title}
          onChangeText={(value: string) => updateField('title', value)}
        />

        <TextView>{i18n.t('Description')}</TextView>
        <InputTextareaField
          value={formData?.caption}
          onChangeText={(value: string) => updateField('caption', value)}
        />

        <TextView>{i18n.t('Location type')}</TextView>
        <LocationTypeField
          value={formData?.location_type}
          onChangeValue={(option: any) =>
            updateField('location_type', option.value)
          }
        />

        <TextView>{i18n.t('Start date')}</TextView>
        <DatePickerField
          value={formData?.period?.start_datetime}
          onChangeValue={(value: any) =>
            updateField('period', {
              ...(formData?.period || {}),
              ...{ start_datetime: DataManager.formatDate(value) },
            })
          }
        />

        <TextView>{i18n.t('End date')}</TextView>
        <DatePickerField
          value={formData?.period?.end_datetime}
          onChangeValue={(value: any) =>
            updateField('period', {
              ...(formData?.period || {}),
              ...{ end_datetime: DataManager.formatDate(value) },
            })
          }
        />

        <TextView>{i18n.t('Location')}</TextView>
        <LocationPickerField 
          latitude={formData?.geolocation_latitude}
          longitude={formData?.geolocation_longitude}
          onPressEvent={() => ScreenManager.toggleModal('LocationMapView', {
            resource: resource,
            latitude: {
              key: 'geolocation_latitude',
              value: formData?.geolocation_latitude,
            },
            longitude: {
              key: 'geolocation_longitude',
              value: formData?.geolocation_longitude,
            },
          })}
        />

        <TextView>{i18n.t('Country')}</TextView>
        <CountryField
          value={formData?.countries}
          onChangeValue={(option: any) =>
            updateField('country', option.value)
          }
        />

        <DividerView theme="secondary" />
        <SectorsField
          resource={resource}
          field={sectorsFieldName}
          label={
            <>
              <IconView name="plus" theme="secondary" radius="round" />
              <TextView>{i18n.t('Add industries')}</TextView>
            </>
          }
          onPressEvent={() => ScreenManager.toggleModal('SectorsList', {
            resource: resource,
            field: sectorsFieldName,
          })}
          onDeleteEvent={(item: any) => {
            const sectorsIds = [...formData?.[sectorsFieldName] || []];
            const index = sectorsIds.findIndex((v) => v === item.id);
            if (index !== -1) sectorsIds.splice(index, 1);
            updateField(sectorsFieldName, sectorsIds);
          }}
        />
        
        <DividerView theme="secondary" />
        <CollaboratorsField
          resource={resource}
          field={collaboratorsFieldName}
          onPressEvent={() => ScreenManager.toggleModal('CollaboratorsList', {
            resource: resource,
            field: collaboratorsFieldName,
          })}
          onDeleteEvent={(item: any) => {
            const collaboratorsIds = [...formData?.[collaboratorsFieldName] || []];
            const index = collaboratorsIds.findIndex((v) => v === item.id);
            if (index !== -1) collaboratorsIds.splice(index, 1);
            updateField(collaboratorsFieldName, collaboratorsIds);
          }}
        />

        <DividerView theme="secondary" />
        <MediaPickerField
          preview={true}
          value={formData?.[mediasFieldName]}
          onSelectItem={(data: any) => updateField(mediasFieldName, data)}
          onDeleteItem={(data: any) => updateField(mediasFieldName, data)}
          label={
            <BoxView direction="row" align="center">
              <IconView name="plus" theme="secondary" radius="round" />
              <TextView>{i18n.t('Add media')}</TextView>
            </BoxView>
          }
        />
        
        <DividerView theme="secondary" />

        <DividerView />
        <ButtonView
          label={i18n.t('Post')}
          isProcessing={isProcessing}
          onPress={submitForm}
        />

        <DividerView />
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
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
    width: Layout.space.base*7,
    height: Layout.space.base*7,
  },
  categoryItemSelected: {
    borderColor: Colors.primary,
  },
});

export default JamForm;
