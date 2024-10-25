import SettingsMenu from "@/components/menu/SettingsMenu";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import SearchView from "@/components/view/SearchView";
import MapView from "@/components/view/MapView";
import AddJamForm from "@/components/form/AddJamForm";
import ProfileForm from "@/components/form/ProfileForm";
import JamsList from "@/components/list/JamsList";
import JammersList from "@/components/list/JammersList";
import HostsList from "@/components/list/HostsList";
import SaveJamView from "@/components/view/SaveJamView";
import ShareJamView from "@/components/view/ShareJamView";
import MoreJamView from "@/components/view/MoreJamView";

export const Screens = {
  JamsList: <JamsList />,
  MapView: <MapView />,
  AddJamForm: <AddJamForm />,
  ProfileForm: <ProfileForm />,
  SettingsMenu: <SettingsMenu />,
  NotificationsMenu: <NotificationsMenu />,
  SearchView: <SearchView />,
  JammersList: <JammersList />,
  HostsList: <HostsList />,
  SaveJamView: <SaveJamView />,
  ShareJamView: <ShareJamView />,
  MoreJamView: <MoreJamView />,
};