import SettingsMenu from "@/components/menu/SettingsMenu";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import SearchMenu from "@/components/menu/SearchMenu";
import MapView from "@/components/view/MapView";
import AddJamForm from "@/components/form/AddJamForm";
import ProfileForm from "@/components/form/ProfileForm";
import JamsList from "@/components/list/JamsList";

export const Screens = {
  jamsList: {
    effect: 'push',
    active: false,
    component: () => <JamsList />,
  },
  settingsMenu: {
    effect: 'push',
    active: false,
    component: () => <SettingsMenu />,
  },
  notificationsMenu: {
    effect: 'fade',
    active: false,
    component: () => <NotificationsMenu />,
  },
  searchMenu: {
    effect: 'slide',
    active: false,
    component: () => <SearchMenu />,
  },
  mapView: {
    effect: 'slide',
    active: false,
    component: () => <MapView />,
  },
  addJamForm: {
    effect: 'fade',
    active: false,
    component: () => <AddJamForm />,
  },
  profileForm: {
    effect: 'fade',
    active: false,
    component: () => <ProfileForm />,
  },
};
