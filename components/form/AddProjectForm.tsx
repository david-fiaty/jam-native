import { useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";
import { setJamData } from "@/redux/slices/JamFormSlice";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import MediaPickerBase from "../base/MediaPickerBase";
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
import DatePickerField from "../field/DatePickerField";
import LocationTypeField from "../field/LocationTypeField";
import EntityManager from "@/manager/EntityManager";
import CollaboratorsField from "../field/CollaboratorsField";
import AddItemButton from "../button/AddItemButton";

const AddProjectForm = () => {
  const dispatch = useDispatch();
  const projectData = useSelector((state: any) => state.projectForm);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);

  const updateField = (key: string, value: any) => {
    dispatch(setJamData<any>({ key: key, value: value, profile_id: profileId }));
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

  if (!profileId) {
    UserManager.getProfileId().then((id: number) => {
      setProfileId(id);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <BackButton
        title={i18n.t('Create a project')}
        onPress={() => ScreenManager.toggleModal('ProfileForm')}
      />

      <DividerView />
      <InputTextField
        placeholder={i18n.t('Title')}
        value={projectData?.title}
        onChangeText={(value: string) => updateField('title', value)}
      />

      <InputTextareaField
        placeholder={i18n.t('Description')}
        value={projectData?.caption}
        onChangeText={(value: string) => updateField('caption', value)}
      />

      <DividerView />
      <BoxView direction="column" align="center" justify="center">
        <TextView>{i18n.t('There are no Jams in this project')}</TextView>
      
        <AddItemButton
          label={i18n.t('Add Jams')}
          onPress={() => ScreenManager.toggleModal("AddJamForm")}
        />
      </BoxView>
      <DividerView />

      <ButtonView
        label={i18n.t('Post')}
        isProcessing={isProcessing}
        onPress={() => {
          setIsProcessing(true);
          submitForm();
        }}
      />

      <DividerView />
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
    borderWidth: 1,
    borderRadius: Layout.radius.round,
    borderColor: Colors.secondary,
    width: Layout.space.base*7,
    height: Layout.space.base*7,
  },
  categoryItemSelected: {
    borderColor: Colors.primary,
  },
});

export default AddProjectForm;
