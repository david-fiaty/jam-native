import SettingsMenu from "@/components/menu/SettingsMenu";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import SearchScreen from "@/components/screen/SearchScreen";
import MapView from "@/components/view/MapView";
import AddJamForm from "@/components/form/AddJamForm";
import ProfileForm from "@/components/form/ProfileForm";
import JamsList from "@/components/list/JamsList";
import JammersList from "@/components/list/JammersList";
import HostsList from "@/components/list/HostsList";

export const Screens = {
  JamsList: <JamsList />,
  MapView: <MapView />,
  AddJamForm: <AddJamForm />,
  ProfileForm: <ProfileForm />,
  SettingsMenu: <SettingsMenu />,
  NotificationsMenu: <NotificationsMenu />,
  SearchScreen: <SearchScreen />,
  JammersList: <JammersList />,
  HostsList: <HostsList />,
};