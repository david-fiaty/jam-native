import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setJamData } from "@/redux/slices/JamFormSlice";
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
import UserManager from "@/manager/UserManager";
import AddItemButton from "../button/AddItemButton";
import ProjectJamsList from "../list/ProjectJamsList";

const AddProjectForm = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const projectData = useSelector((state: any) => state.projectForm);

  const updateField = (key: string, value: any) => {
    dispatch(
      setJamData<any>({ key: key, value: value, profile_id: profileId })
    );
  };

  const submitForm = async () => {
    /*
    EntityManager.addProject(projectData).then((success: boolean) => {
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
      if (!profileId) setProfileId(await UserManager.getProfileId());
      setIsLoaded(true);
    })();
  });

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
        onPress={() => ScreenManager.toggleModal("ProfileForm")}
      />

      <View style={Layout.formContainer}>
        <InputTextField
          placeholder={i18n.t("Name")}
          value={projectData?.title}
          onChangeText={(value: string) => updateField("name", value)}
        />

        <InputTextareaField
          placeholder={i18n.t("Description")}
          value={projectData?.caption}
          onChangeText={(value: string) => updateField("description", value)}
        />

        <DividerView />

        {!projectData?.jams_ids?.length && (
          <BoxView direction="column" align="center" justify="center">
            <TextView>{i18n.t("There are no Jams in this project")}</TextView>
            <AddItemButton
              label={i18n.t("Add")}
              onPress={() => ScreenManager.toggleModal("SelectJamsForm")}
            />
          </BoxView>
        )}

        {projectData?.jams_ids?.length && (
          <BoxView direction="column" align="flex-start" justify="flex-start">
            <TextView style={styles.title}>{i18n.t("Selected Jams")}</TextView>
            <ProjectJamsList 
              idArray={projectData.jams_ids} 
              addButton={true} 
              onAddEvent={() => ScreenManager.toggleModal("SelectJamsForm")}
              onDeleteEvent={() => console.log('delete')}
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
