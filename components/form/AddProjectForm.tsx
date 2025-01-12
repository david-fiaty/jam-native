import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
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
import CountryField from "../field/CountryField";

const AddProjectForm = () => {
  const resource: string = 'project';
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const activeScreen: any = ScreenManager.getActiveScreen();
  const formData: any = useSelector((state: any) => state.form[resource]);
  const profileId: any = activeScreen.params?.profileId; 
  const profileJams: any = activeScreen.params?.profileJams; 

  const updateField = (key: string, value: any) => {
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

    if (result?.error) message.content = i18n.t(result.error);
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
  
  console.log(formData);
  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <BackButton
        title={i18n.t("Create a project")}
        onPress={() => ScreenManager.toggleScreen("AddProjectForm")}
      />

      <View style={Layout.formContainer}>
        <TextView>{i18n.t("Name")}</TextView>
        <InputTextField
          value={formData?.title}
          onChangeText={(value: string) => updateField("name", value)}
        />

        <TextView>{i18n.t("Description")}</TextView>
        <InputTextareaField
          value={formData?.caption}
          onChangeText={(value: string) => updateField("description", value)}
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
          onPressEvent={() => ScreenManager.toggleScreen('SectorsList', {
            resource: resource,
            field: 'sectors_ids',
          })}
          onDeleteEvent={(item: any) => {
            const sectorsIds = [...formData?.sectors_ids || []];
            const index = sectorsIds.findIndex((v) => v === item.id);
            if (index !== -1) sectorsIds.splice(index, 1);
            updateField('sectors_ids', sectorsIds.filter(Boolean));
          }}
        />

      <TextView>{i18n.t('Countries')}</TextView>
      <CountryField
        value={formData?.scope_countries_codes}
        onChangeValue={(option: any) =>
          updateField('scope_countries_codes', option.value)
        }
      />

        <DividerView theme="secondary" />
        { !formData?.jams_ids?.length && (
          <BoxView direction="column" align="center" justify="center">
            <AddItemButton
              label={i18n.t("Add Jams")}
              onPress={() => ScreenManager.toggleScreen("SelectJamsForm", {
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
              onAddButtonPress={() => ScreenManager.toggleScreen("SelectJamsForm", {
                resource: resource,
                profileId: formData?.id,
                profileJams: [18, 20, 32, 33, 34], // Todo - Enable this
              })}
              onDeleteButtonPress={(row: any) => {
                let selectedIds: any = [...formData?.jams_ids];
                let index: number = selectedIds.findIndex((id: any) => id == row?.item?.id);
                delete selectedIds[index];
                updateField("jams_ids", selectedIds.filter((o: any) => o));
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
