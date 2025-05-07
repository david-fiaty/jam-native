import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
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
import ProjectJamsField from "../field/ProjectJamsField";
import TextView from "../view/TextView";
import EntityManager from "@/manager/EntityManager";
import SectorsField from "../field/SectorsField";
import PrivacyStatusField from "../field/PrivacyStatusField";
import DatePickerField from "../field/DatePickerField";
import CountriesField from "../field/CountriesField";
import DataManager from "@/manager/DataManager";
import ModalManager from "@/manager/ModalManager";
import UserManager from "@/manager/UserManager";

const AddProjectForm = () => {
  const resource: string = 'project';
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

    if (result?.error) message.content = i18n.t(result.error)
    else updateField(null, null)

    ScreenManager.showMessage(message);
    setIsProcessing(false);
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
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
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.formContainer}
    >
      <View style={[Layout.formContainer, styles.container]}>
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

        <TextView>{i18n.t('Select countries')}</TextView>
        <CountriesField
          resource={resource}
          field="scope_countries_codes"
          placeholder={i18n.t('Select countries')}
          value={formData?.scope_countries_codes}
          onPress={() => ModalManager.toggleModal('CountriesList', {
            resource: resource,
            field: 'scope_countries_codes',
          })}
        />

        <TextView>{i18n.t('Select your sectors')}</TextView>
        <SectorsField
          resource={resource}
          field="sectors_ids"
          placeholder={i18n.t('Select your sectors')}
          value={formData?.sectors_ids}
          onPress={() => ModalManager.toggleModal('SectorsList', {
            resource: resource,
            field: 'sectors_ids',
          })}
        />

        <DividerView theme="white" />

        { !formData?.jams_ids?.length && (
          <BoxView direction="column" align="center" justify="center">
            <AddItemButton
              label={i18n.t("Add Jams")}
              onPress={() => ModalManager.toggleModal("SelectJamsForm", {
                field: 'jams_ids',
                resource: resource,
                profileId: profileId,
              })}
            />
          </BoxView>
        )}
        
        <View style={styles.subtmitButtoncontainer}>
          <ButtonView
            label={i18n.t("Submit")}
            isProcessing={isProcessing}
            onPress={submitForm}
          />
        </View>

        <DividerView />
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  subtmitButtoncontainer: {
    width: '100%',
    marginTop: Layout.space.base,
  },
});

export default AddProjectForm;
