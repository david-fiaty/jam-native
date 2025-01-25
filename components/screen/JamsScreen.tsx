import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { setModalConfig } from "@/redux/slices/ModalSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Modals } from "@/constants/Modals";
import ScreenView from "../view/ScreenView";
import BoxView from "../view/BoxView";
import DeviceManager from "@/manager/DeviceManager";
import FooterNavigation from "../navigation/FooterNavigation";
import JamsList from "../list/JamsList";
import ScreenManager from "@/manager/ScreenManager";
import SettingsMenu from "@/components/menu/SettingsMenu";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import SearchView from "@/components/view/SearchView";
import JamsMapView from "@/components/view/JamsMapView";
import JamForm from "@/components/form/JamForm";
import AddProjectForm from "../form/AddProjectForm";
import ProfileForm from "@/components/form/ProfileForm";
import JammersList from "@/components/list/JammersList";
import HostsList from "@/components/list/HostsList";
import SavedJamAction from "@/components/action/SavedJamAction";
import LikedJamAction from "../action/LikedJamAction";
import MoreJamActionsView from "@/components/view/MoreJamActionsView";
import AddedJamAction from "../action/AddedJamAction";
import CollaboratorsList from "../list/CollaboratorsList";
import SectorsList from "../list/SectorsList";
import LocationMapView from "../view/LocationMapView";
import SelectJamsForm from "../form/SelectJamsForm";
import CountriesList from "../list/CountriesList";
import AddJamToProjectForm from "../form/AddJamToProjectForm";
import JamScreen from "./JamScreen";
import ProjectScreen from "./ProjectScreen";

const modalComponents: any = {
  JamsList: <JamsList />,
  JamsMapView: <JamsMapView />,
  JamForm: <JamForm />,
  AddProjectForm: <AddProjectForm />,
  SelectJamsForm: <SelectJamsForm />,
  ProfileForm: <ProfileForm />,
  AddJamToProjectForm: <AddJamToProjectForm />,
  SettingsMenu: <SettingsMenu />,
  NotificationsMenu: <NotificationsMenu />,
  SearchView: <SearchView />,
  JammersList: <JammersList />,
  CollaboratorsList: <CollaboratorsList />,
  SectorsList: <SectorsList />,
  CountriesList: <CountriesList />,
  LocationMapView: <LocationMapView />,
  HostsList: <HostsList />,
  SavedJamAction: <SavedJamAction />,
  LikedJamAction: <LikedJamAction />,
  AddedJamAction: <AddedJamAction />,
  MoreJamActionsView: <MoreJamActionsView />,
  JamScreen: <JamScreen />,
  ProjectScreen: <ProjectScreen />,
};

const JamsScreen = React.memo(() => {
  const route = useRoute();
  const dispatch = useDispatch();
  const activeModal = ScreenManager.getActiveModal();
  
  useEffect(() => {
    dispatch(setModalConfig(Modals));
  }, [Modals]);

  return (
    <ScreenView>
      <View style={styles.container}>
        <BoxView style={Layout.mainContent}>
          <JamsList />
        </BoxView>
        
        {(route.name == "jams" || activeModal?.footerNavigation) && (
          <FooterNavigation />
        )}
      </View>
    </ScreenView>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: DeviceManager.window.height,
    backgroundColor: Colors.white,
  },
});

export default JamsScreen;
