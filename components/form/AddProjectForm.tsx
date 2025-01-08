import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
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
import TextView from "../view/TextView";
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import AddItemButton from "../button/AddItemButton";
import ProjectJamsList from "../list/ProjectJamsList";

const AddProjectForm = () => {
  const resource: string = 'project';
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const activeScreen: any = ScreenManager.getActiveScreen();
  const formData: any = useSelector((state: any) => state.form[activeScreen.params.resource]);
  const profileId: any = activeScreen.params.profileId; 

  const updateField = (key: string, value: any) => {
    dispatch(setFormData<any>({ 
      resource: resource,
      key: key, 
      value: value, 
      profile_id: profileId,
    }));
  };

  // Todo - Fix delete project jam
  const deleteJam = (row: any) => {
    let selectedJams: any = [...formData.jams];
    let index: number = selectedJams.findIndex((id: number) => id == row.item.id);
    if (index !== -1) delete selectedJams[index]; 
    selectedJams = selectedJams.filter((n: any) => n);
    updateField("jams", selectedJams);
  };

  const submitForm = async () => {
    /*
    EntityManager.addProject(formData).then((success: boolean) => {
      setIsProcessing(false);
      //success === true
      false
        ? router.replace('/jams')
        : ScreenManager.showMessage(
            i18n.t('The project data is invalid. Please check and trya gain.')
          );
    });

    */
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <BackButton
        title={i18n.t("Create a project")}
        onPress={() => ScreenManager.toggleScreen("ProfileForm")}
      />

      <View style={Layout.formContainer}>
        <InputTextField
          placeholder={i18n.t("Name")}
          value={formData?.title}
          onChangeText={(value: string) => updateField("name", value)}
        />

        <InputTextareaField
          placeholder={i18n.t("Description")}
          value={formData?.caption}
          onChangeText={(value: string) => updateField("description", value)}
        />

        <DividerView />

        {!formData?.jams?.length && (
          <BoxView direction="column" align="center" justify="center">
            <AddItemButton
              label={i18n.t("Add Jams")}
              onPress={() => ScreenManager.toggleScreen("SelectJamsForm")}
            />
          </BoxView>
        )}

        {formData?.jams?.length && (
          <BoxView direction="column" align="flex-start" justify="flex-start">
            <TextView style={styles.title}>{i18n.t("Selected Jams")}</TextView>
            <ProjectJamsList 
              idArray={formData.jams} 
              addButton={true} 
              onAddEvent={() => ScreenManager.toggleScreen("SelectJamsForm", {
                resource: resource,
                profileId: formData?.id,
                profileJams: formData?.profile_jams, // Todo - Enable this
                profileJams: [18, 20, 32, 33, 34],
              })}
              onDeleteEvent={(row) => deleteJam(row)}
            />
          </BoxView>
        )}

        <DividerView />

        <ButtonView
          label={i18n.t("Post")}
          isProcessing={isProcessing}
          onPress={() => {
            setIsProcessing(true);
            submitForm();
          }}
        />

        <DividerView />
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  }
});

export default AddProjectForm;
