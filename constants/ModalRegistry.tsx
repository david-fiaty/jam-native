import SettingsMenu from "@/components/menu/SettingsMenu";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import SearchView from "@/components/view/SearchView";
import JamsMapView from "@/components/view/JamsMapView";
import JamForm from "@/components/form/JamForm";
import AddProjectForm from "@/components/form/AddProjectForm";
import ProfileForm from "@/components/form/ProfileForm";
import JammersList from "@/components/list/JammersList";
import HostsList from "@/components/list/HostsList";
import SavedJamAction from "@/components/action/SavedJamAction";
import LikedJamAction from "@/components/action/LikedJamAction";
import MoreJamActionsView from "@/components/view/MoreJamActionsView";
import AddedJamAction from "@/components/action/AddedJamAction";
import CollaboratorsList from "@/components/list/CollaboratorsList";
import SectorsList from "@/components/list/SectorsList";
import LocationMapView from "@/components/view/LocationMapView";
import SelectJamsForm from "@/components/form/SelectJamsForm";
import CountriesList from "@/components/list/CountriesList";
import AddJamToProjectForm from "@/components/form/AddJamToProjectForm";
import JamScreen from "@/components/screen/JamScreen";
import ProjectScreen from "@/components/screen/ProjectScreen";
import JamsList from "@/components/list/JamsList";

const ModalRegistry: any = {
  JamsList: () => <JamsList />,
  JamsMapView: () => <JamsMapView />,
  JamForm: () => <JamForm />,
  AddProjectForm: () => <AddProjectForm />,
  SelectJamsForm: () => <SelectJamsForm />,
  ProfileForm: () => <ProfileForm />,
  AddJamToProjectForm: () => <AddJamToProjectForm />,
  SettingsMenu: () => <SettingsMenu />,
  NotificationsMenu: () => <NotificationsMenu />,
  SearchView: () => <SearchView />,
  JammersList: () => <JammersList />,
  CollaboratorsList: () => <CollaboratorsList />,
  SectorsList: () => <SectorsList />,
  CountriesList: () => <CountriesList />,
  LocationMapView: () => <LocationMapView />,
  HostsList: () => <HostsList />,
  SavedJamAction: () => <SavedJamAction />,
  LikedJamAction: () => <LikedJamAction />,
  AddedJamAction: () => <AddedJamAction />,
  MoreJamActionsView: () => <MoreJamActionsView />,
  JamScreen: () => <JamScreen />,
  ProjectScreen: () => <ProjectScreen />,
};

export default ModalRegistry;
