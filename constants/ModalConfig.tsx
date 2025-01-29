import AddedJamAction from "@/components/action/AddedJamAction";
import LikedJamAction from "@/components/action/LikedJamAction";
import SavedJamAction from "@/components/action/SavedJamAction";
import AddJamToProjectForm from "@/components/form/AddJamToProjectForm";
import AddProjectForm from "@/components/form/AddProjectForm";
import JamForm from "@/components/form/JamForm";
import ProfileForm from "@/components/form/ProfileForm";
import SelectJamsForm from "@/components/form/SelectJamsForm";
import CollaboratorsList from "@/components/list/CollaboratorsList";
import CountriesList from "@/components/list/CountriesList";
import HostsList from "@/components/list/HostsList";
import JammersList from "@/components/list/JammersList";
import JamsList from "@/components/list/JamsList";
import SectorsList from "@/components/list/SectorsList";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import SettingsMenu from "@/components/menu/SettingsMenu";
import JamScreen from "@/components/screen/JamScreen";
import ProjectScreen from "@/components/screen/ProjectScreen";
import JamsMapView from "@/components/view/JamsMapView";
import LocationMapView from "@/components/view/LocationMapView";
import MoreJamActionsView from "@/components/view/MoreJamActionsView";
import SearchView from "@/components/view/SearchView";

export const ModalConfig: any = [
  {
    name: 'JamsList', 
    effect: 'fade',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <JamsList />,
  },
  {
    name: 'JamsMapView', 
    effect: 'fade',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <JamsMapView />,
  },
  {
    name: 'JamForm', 
    effect: 'fade',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <JamForm />,
    activeIconTheme: 'secondary',
  },
  {
    name: 'AddProjectForm', 
    effect: 'fade',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <AddProjectForm />,
  },
  {
    name: 'SelectJamsForm', 
    effect: 'fade',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <SelectJamsForm />,
  },
  {
    name: 'ProfileForm', 
    effect: 'fade',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <ProfileForm />,
  },
  {
    name: 'AddJamToProjectForm', 
    effect: 'fade',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <AddJamToProjectForm />,
  },
  {
    name: 'SettingsMenu', 
    effect: 'fade',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <SettingsMenu />,
  },
  {
    name: 'NotificationsMenu', 
    effect: 'fade',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <NotificationsMenu />,
  },
  {
    name: 'SearchView', 
    effect: 'fade',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <SearchView />,
  },
  {
    name: 'LocationMapView', 
    effect: 'slide',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <LocationMapView />,
  },
  {
    name: 'JammersList', 
    effect: 'slide',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <JammersList />,
  },
  {
    name: 'CollaboratorsList', 
    effect: 'slide',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <CollaboratorsList />,
  },
  {
    name: 'SectorsList', 
    effect: 'slide',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <SectorsList />,
  },
  {
    name: 'CountriesList', 
    effect: 'slide',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <CountriesList />,
  },
  {
    name: 'HostsList', 
    effect: 'slide',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <HostsList />,
  },
  {
    name: 'SavedJamAction', 
    effect: 'slide',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <SavedJamAction />,
  },
  {
    name: 'LikedJamAction', 
    effect: 'slide',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <LikedJamAction />,
  },
  {
    name: 'AddedJamAction', 
    effect: 'slide',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <AddedJamAction />,
  },
  {
    name: 'MoreJamActionsView', 
    effect: 'slide',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <MoreJamActionsView />,
  },
  {
    name: 'JamScreen', 
    effect: 'fade',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <JamScreen />,
  },
  {
    name: 'ProjectScreen', 
    effect: 'fade',
    headerNavigation: true,
    footerNavigation: true,
    params: {},
    component: <ProjectScreen />,
  },
];
