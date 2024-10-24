import SettingsMenu from "@/components/menu/SettingsMenu";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import SearchMenu from "@/components/menu/SearchMenu";
import MapView from "@/components/view/MapView";
import AddJamForm from "@/components/form/AddJamForm";
import ProfileForm from "@/components/form/ProfileForm";
import JamsList from "@/components/list/JamsList";

export const Screens = [
  {
    name: 'MapView', 
    effect: 'push',
    active: false,
    next: false,
    component: () => <MapView />,
  },
  {
    name: 'AddJamForm', 
    effect: 'push',
    active: false,
    next: false,
    component: () => <AddJamForm />,
  },
  {
    name: 'ProfileForm', 
    effect: 'push',
    active: false,
    next: false,
    component: () => <ProfileForm />,
  },
  {
    name: 'JamsList', 
    effect: 'push',
    active: false,
    next: false,
    component: () => <JamsList />,
  },
  {
    name: 'SettingsMenu', 
    effect: 'push',
    active: false,
    next: false,
    component: () => <SettingsMenu />,
  },
  {
    name: 'NotificationsMenu', 
    effect: 'push',
    active: false,
    next: false,
    component: () => <NotificationsMenu />,
  },
  {
    name: 'SearchMenu', 
    effect: 'push',
    active: false,
    next: false,
    component: () => <SearchMenu />,
  },
];
