import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
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
import TextView from "../view/TextView";
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import UserManager from "@/manager/UserManager";
import DatePickerField from "../field/DatePickerField";
import LocationTypeField from "../field/LocationTypeField";
import EntityManager from "@/manager/EntityManager";
import CollaboratorsField from "../field/CollaboratorsField";
import FormManager from "@/manager/FormManager";
import CountriesField from "../field/CountriesField";
import JamCategoryField from "../field/JamCategoryField";

type Props = {
  jamId?: any;
  isPublic?: boolean;
};

const resource: string = 'jam';

const JamForm = ({ jamId, isPublic }: Props) => {
  const dispatch = useDispatch();
  const hasLoadedOnce = useRef(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const formData = useSelector((state: any) => state.form[resource]);

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

  useEffect(() => {
    if (!hasLoadedOnce.current) {
      hasLoadedOnce.current = true;
    } 
  }, []);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        let jamData: any = hasLoadedOnce ? formData : {};
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

  if (!isLoaded && !hasLoadedOnce) return <SpinnerView />;

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
        <JamCategoryField
          resource={resource}
          fieldKey="type"
          value={formData?.type || ''}
          label={i18n.t('What kind of Jam is it?')}
          rules={['required']}
        />

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
            <LocationPickerField
              resource={resource}
              latitudeKey="geolocation_latitude"
              longitudeKey="geolocation_longitude"
              latitudeValue={formData?.geolocation_latitude || ''}
              longitudeValue={formData?.geolocation_longitude || ''}
              rules={['required']}
              label={i18n.t('Location')}
              placeholder={i18n.t('Select a location')}
            />
          </>
        )}

        <DatePickerField
          resource={resource}
          fieldKey="start_datetime"
          parentKey="period"
          rules={['date']}
          value={formData?.period?.start_datetime || ''}
          label={i18n.t('Start date')}
          placeholder={i18n.t('Select the start date')}
        />

        <DatePickerField
          resource={resource}
          fieldKey="end_datetime"
          parentKey="period"
          rules={['date']}
          value={formData?.period?.end_datetime || ''}
          label={i18n.t('End date')}
          placeholder={i18n.t('Select the end date')}
        />

        <CountriesField
          resource={resource}
          fieldKey="scope_countries_codes"
          multiple={false}
          value={formData?.scope_countries_codes || ''}
          label={i18n.t('Country')}
          placeholder={i18n.t('Select a country')}
        />

        <SectorsField
          resource={resource}
          fieldKey="sectors_ids"
          childrenKey="sub_sectors"
          rules={['required']}
          value={formData?.sectors_ids || []}
          listLabel={i18n.t('Activity sectors')}
          listPlaceholder={i18n.t('Select your sectors')}
          subListLabel={i18n.t('Activity sub sectors')}
          subListPlaceholder={i18n.t('Select your sub sectors')}
        />

        <CollaboratorsField
          resource={resource}
          fieldKey="collaborators_ids"
          value={formData?.collaborators_ids || []}
          label={i18n.t('Collaborators')}
          placeholder={i18n.t('Select your collaborators')}
        />

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
  fieldContainer: {
    maxWidth: '100%',
    flexShrink: 1,
  },
  submitButtonContainer: {
    marginBottom: Layout.space.base,
  },
});

export default JamForm;
