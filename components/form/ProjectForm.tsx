import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import ButtonView from "../view/ButtonView";
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import TextView from "../view/TextView";
import EntityManager from "@/manager/EntityManager";
import SectorsField from "../field/SectorsField";
import PrivacyStatusField from "../field/PrivacyStatusField";
import DatePickerField from "../field/DatePickerField";
import CountriesField from "../field/CountriesField";
import DataManager from "@/manager/DataManager";
import ModalManager from "@/manager/ModalManager";
import UserManager from "@/manager/UserManager";
import FormManager from "@/manager/FormManager";
import ProjectJamsField from "../field/ProjectJamsField";

const resource: string = 'project';

const ProjectForm = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const updateField = (key: any, value: any) => {
    dispatch(setFormData<any>({
      resource: resource,
      key: key,
      value: value,
    }));
  };

  const submitForm = async () => {
    setIsProcessing(true);
    let result: any = await EntityManager.addProject(formData);
    let message: any = {
      title: i18n.t('Create project'),
      content: i18n.t('The project was successfully created.'),
    };

    if (result.success === false) {
      message.content = i18n.t('Invalid data submission');
    }

    ScreenManager.showMessage(message);

    setIsProcessing(false);
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        //FormManager.resetForm(resource); // Todo - Fix form reset on web
        setProfileId(await UserManager.getProfileId());

        dispatch(setFormData<any>({
          resource: resource,
          key: null,
          value: {
            ...formData,
            ...{ profile_id: profileId },
          },
        }));

        setIsLoaded(true);
      }
    })();
  }, [isLoaded, resource, profileId, formData]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <TextView>PROJECT FORM</TextView>
  )

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={[Layout.formContainer, styles.container]}
    >
      <BoxView direction="column" style={[Layout.formContainer, styles.formContainer]}>
        <TextView>{i18n.t("Name")}*</TextView>
        <InputTextField
          value={formData?.name}
          onChangeText={(value: string) => FormManager.updateField(resource, 'name', value, ['string'])}
        />
        {FormManager.renderError('name')}

        <TextView>{i18n.t("Description")}*</TextView>
        <InputTextareaField
          value={formData?.description}
          onChangeText={(value: string) => FormManager.updateField(resource, 'description', value, ['string'])}
        />
        {FormManager.renderError('description')}

        <TextView>{i18n.t("Privacy status")}*</TextView>
        <PrivacyStatusField
          value={formData?.privacy_status}
          onChangeValue={(option: any) => FormManager.updateField(resource, 'privacy_status', option.value, ['string'])}
        />
        {FormManager.renderError('privacy_status')}

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

        <TextView>{i18n.t('Select countries')}</TextView>
        <CountriesField
          multiple={true}
          resource={resource}
          field="scope_countries_codes"
          placeholder={i18n.t('Select countries')}
          value={formData?.scope_countries_codes}
          onPress={() => ModalManager.toggleModal('CountriesList', {
            resource: resource,
            field: 'scope_countries_codes',
            multiple: true,
          })}
        />

        <SectorsField
          resource={resource}
          field="sectors_ids"
          value={formData?.sectors_ids}
        />

        <TextView>{i18n.t('Project Jams')}</TextView>
        <ProjectJamsField
          idArray={formData?.jams_ids || []}
          emptyMessage={i18n.t('No data available.')}
          isPublic={false}
          addable={true}
        />

        <View style={styles.subtmitButtoncontainer}>
          <ButtonView
            label={i18n.t("Submit")}
            isProcessing={isProcessing}
            onPress={submitForm}
          />
        </View>
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
  addButtonContainer: {
    width: '100%',
  },
  subtmitButtoncontainer: {
    width: '100%',
    marginTop: Layout.space.base,
    marginBottom: Layout.space.base * 2,
  },
});

export default ProjectForm;
