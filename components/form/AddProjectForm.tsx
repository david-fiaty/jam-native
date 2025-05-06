import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import DividerView from "../view/DividerView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import ButtonView from "../view/ButtonView";
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import AddItemButton from "../button/AddItemButton";
import ProjectJamsList from "../list/ProjectJamsList";
import TextView from "../view/TextView";
import EntityManager from "@/manager/EntityManager";
import SectorsField from "../field/SectorsField";
import IconView from "../view/IconView";
import PrivacyStatusField from "../field/PrivacyStatusField";
import DatePickerField from "../field/DatePickerField";
import CountriesField from "../field/CountriesField";
import DataManager from "@/manager/DataManager";

const AddProjectForm = () => {
  const resource: string = 'project';
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const activeModal: any = ScreenManager.getActiveModal();
  const formData: any = useSelector((state: any) => state.form[resource]);
  const profileId: any = activeModal.params?.profileId; 
  const profileJams: any = activeModal.params?.profileJams; 

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

    if (result?.error) message.content = i18n.t(result.error)
    else updateField(null, null)

    ScreenManager.showMessage(message);
    setIsProcessing(false);
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
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
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <View style={Layout.formContainer}>
        <TextView>{i18n.t("Name")}</TextView>
        <InputTextField
          value={formData?.name}
          onChangeText={(value: string) => updateField("name", value)}
        />

        <TextView>{i18n.t("Description")}</TextView>
        <InputTextareaField
          value={formData?.description}
          onChangeText={(value: string) => updateField("description", value)}
        />

        <TextView>{i18n.t("Privacy status")}</TextView>
        <PrivacyStatusField
          value={formData?.privacy_status}
          onChangeValue={(option: any) =>
            updateField("privacy_status", option.value)
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

        <DividerView theme="secondary" />
        <CountriesField
          resource={resource}
          field="scope_countries_codes"
          label={
            <>
              <IconView name="plus" theme="secondary" radius="round" />
              <TextView>{i18n.t('Add countries')}</TextView>
            </>
          }
          onPressEvent={() => ScreenManager.toggleModal('CountriesList', {
            resource: resource,
            field: 'scope_countries_codes',
          })}
          onDeleteEvent={(item: any) => {
            const countriesCodes = [...formData?.scope_countries_codes || []];
            const index = countriesCodes.findIndex((v) => v === item.code);
            if (index !== -1) countriesCodes.splice(index, 1);
            updateField('scope_countries_codes', countriesCodes);
          }}
        />

        <DividerView theme="secondary" />
        <SectorsField
          resource={resource}
          field="sectors_ids"
          label={
            <>
              <IconView name="plus" theme="secondary" radius="round" />
              <TextView>{i18n.t('Add industries')}</TextView>
            </>
          }
          onPressEvent={() => ScreenManager.toggleModal('SectorsList', {
            resource: resource,
            field: 'sectors_ids',
          })}
          onDeleteEvent={(item: any) => {
            const sectorsIds = [...formData?.sectors_ids || []];
            const index = sectorsIds.findIndex((v) => v === item.id);
            if (index !== -1) sectorsIds.splice(index, 1);
            updateField('sectors_ids', sectorsIds);
          }}
        />

        <DividerView theme="secondary" />
        { !formData?.jams_ids?.length && (
          <BoxView direction="column" align="center" justify="center">
            <AddItemButton
              label={i18n.t("Add Jams")}
              onPress={() => ScreenManager.toggleModal("SelectJamsForm", {
                resource: resource,
                profileId: profileId,
                profileJams: profileJams,
              })}
            />
          </BoxView>
        )}

        { formData?.jams_ids?.length > 0 && (
          <BoxView direction="column" align="flex-start" justify="flex-start">
            <TextView>{i18n.t('Selected Jams')}</TextView>
            <ProjectJamsList 
              resource={resource}
              selectedIds={formData?.jams_ids}
              onAddButtonPress={() => ScreenManager.toggleModal("SelectJamsForm", {
                resource: resource,
                profileId: formData?.id,
                profileJams: profileJams,
              })}
              onDeleteButtonPress={(row: any) => {
                let selectedIds: any = [...formData?.jams_ids];
                let index: number = selectedIds.findIndex((id: any) => id == row?.item?.id);
                selectedIds.splice(index, 1);
                updateField("jams_ids", selectedIds);
              }}
            />
          </BoxView>
        ) }

        <DividerView />

        <ButtonView
          label={i18n.t("Submit")}
          isProcessing={isProcessing}
          onPress={submitForm}
        />

        <DividerView />
      </View>
    </BoxView>
  );
};

export default AddProjectForm;
