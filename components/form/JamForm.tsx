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
import ModalManager from "@/manager/ModalManager";
import FormManager from "@/manager/FormManager";
import CountriesField from "../field/CountriesField";

type Props = {
  jamId?: any;
  isPublic?: boolean;
};

const resource: string = 'jam';

const JamForm = ({ jamId, isPublic }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const formData = useSelector((state: any) => state.form[resource]);
  const jamCategories: any = EntityManager.getJamTypes();

  const submitForm = async () => {
    setIsProcessing(true);

    let message: any = {
      title: i18n.t('Create Jam'),
      content: i18n.t('Jam data successfully submitted.'),
    };

    let result: any = await EntityManager.addJam(formData);

    if (result.success === false) {
      message.content = i18n.t('Invalid data submission.');
      FormManager.addServerErrors(resource, result.response);
    }
    else {
      FormManager.resetForm(resource);
    }

    ScreenManager.showMessage(message);
    setIsProcessing(false);
  };

  const renderJamCategory = (row: any) => (
    <TouchableOpacity onPress={() => FormManager.updateField(resource, 'type', row.item.id, ['string'])}>
      <View style={styles.categoryContainer}>
        <View
          style={[
            styles.categoryItem,
            formData?.type == row.item.id ? styles.categoryItemSelected : {},
          ]}
        >
          <IconView name={row.item.icon} theme="secondary" />
        </View>
        <TextView>{row.item.name}</TextView>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        let jamData: any = {};
        let profileId: number = await UserManager.getProfileId();
        setProfileId(profileId);

        if (!isNaN(parseInt(jamId)) && parseInt(jamId) > 0) {
          jamData = (await EntityManager.getJams([jamId]))?.[0];
        }

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
      <BoxView
        direction="column"
        style={[Layout.formContainer, styles.formContainer]}
      >
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

        <InputTextField
          resource={resource}
          fieldKey="title"
          rules={['required', 'string']}
          value={formData?.title || ''}
          label={i18n.t('Title')}
          placeholder={i18n.t('Provide a title')}
        />

        <InputTextareaField
          resource={resource}
          fieldKey="caption"
          rules={['required', 'string']}
          value={formData?.caption || ''}
          label={i18n.t('Description')}
          placeholder={i18n.t('Provide a description')}
        />

        <TextView>{i18n.t('Select media')} *</TextView>
        <MediaPickerField
          mediaTypes={['images']}
          multiple={true}
          preview={true}
          placeholder={i18n.t('Select media files')}
          value={formData?.upload_medias || []}
          onSelectItem={(data: any) => FormManager.updateField(resource, 'upload_medias', data, ['array'])}
          onDeleteItem={(data: any) => FormManager.updateField(resource, 'upload_medias', data, ['array'])}
        />
        {FormManager.renderError('upload_medias')}

        <LocationTypeField
          resource={resource}
          fieldKey="location_type"
          rules={['required', 'string']}
          value={formData?.location_type || ''}
          label={i18n.t('Location type')}
          placeholder={i18n.t('Select a location type')}
        />

        {['physical', 'online_physical'].includes(formData?.location_type) && (
          <>
            <TextView>{i18n.t('Location')} *</TextView>
            <LocationPickerField
              resource={resource}
              placeholder={i18n.t('Select your location')}
              onChangeValue={(data: any) => {
                FormManager.updateField(resource, 'geolocation_latitude', data?.geolocation_latitude, ['number']);
                FormManager.updateField(resource, 'geolocation_longitude', data?.geolocation_longitude, ['number']);
              }}
              onPress={() => ModalManager.toggleModal('SelectLocationMapView', {
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
          value={formData?.period?.start_datetime || ''}
          placeholder={i18n.t('Select the start date')}
          onChangeValue={(value: any) => FormManager.updateField(resource, 'period', {
            ...(formData?.period || {}),
            ...{ start_datetime: DataManager.toDbDate(value) },
          }, ['date'])}
        />
        {FormManager.renderError('period')}

        <TextView>{i18n.t('End date')}</TextView>
        <DatePickerField
          value={formData?.period?.end_datetime || ''}
          placeholder={i18n.t('Select the end date')}
          onChangeValue={(value: any) => FormManager.updateField(resource, 'period', {
            ...(formData?.period || {}),
            ...{ end_datetime: DataManager.toDbDate(value) },
          }, ['date'])}
        />
        {FormManager.renderError('period')}

        <TextView>{i18n.t('Country')}</TextView>
        <CountriesField
          multiple={false}
          resource={resource}
          field="scope_countries_codes"
          placeholder={i18n.t('Select a country')}
          value={formData?.scope_countries_codes || ''}
          onPress={() => ModalManager.toggleModal('CountriesList', {
            resource: resource,
            field: 'scope_countries_codes',
            multiple: false,
          })}
        />
        {FormManager.renderError('scope_countries_codes')}

        <SectorsField
          resource={resource}
          field="sectors_ids"
          value={formData?.sectors_ids || []}
        />

        <TextView>{i18n.t('Select collaborators')}</TextView>
        <CollaboratorsField
          resource={resource}
          field="collaborators_ids"
          value={formData?.collaborators_ids || []}
          placeholder={i18n.t('Select collaborators')}
          onPress={() => ModalManager.toggleModal('CollaboratorsList', {
            resource: resource,
            field: "collaborators_ids",
          })}
        />
        {FormManager.renderError('collaborators_ids')}

        <DividerView />

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
