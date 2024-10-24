import SettingsMenu from "@/components/menu/SettingsMenu";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import SearchScreen from "@/components/screen/SearchScreen";
import MapView from "@/components/view/MapView";
import AddJamForm from "@/components/form/AddJamForm";
import ProfileForm from "@/components/form/ProfileForm";
import JamsList from "@/components/list/JamsList";
import JammersList from "@/components/list/JammersList";

export const Screens = [
  {
    name: 'MapView', 
    effect: 'slide',
    active: false,
    component: () => <MapView />,
  },
  {
    name: 'AddJamForm', 
    effect: 'push',
    active: false,
    component: () => <AddJamForm />,
  },
  {
    name: 'ProfileForm', 
    effect: 'fade',
    active: false,
    component: () => <ProfileForm />,
  },
  {
    name: 'JamsList', 
    effect: 'push',
    active: false,
    component: () => <JamsList />,
  },
  {
    name: 'SettingsMenu', 
    effect: 'push',
    active: false,
    component: () => <SettingsMenu />,
  },
  {
    name: 'NotificationsMenu', 
    effect: 'push',
    active: false,
    component: () => <NotificationsMenu />,
  },
  {
    name: 'SearchScreen', 
    effect: 'push',
    active: false,
    component: () => <SearchScreen />,
  },
  {
    name: 'JammersList', 
    effect: 'slide',
    active: false,
    component: () => <JammersList />,
  },
];
