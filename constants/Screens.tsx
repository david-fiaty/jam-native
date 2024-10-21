import SettingsMenu from '@/components/menu/SettingsMenu';
import NotificationsMenu from '@/components/menu/NotificationsMenu';
import SearchMenu from '@/components/menu/SearchMenu';
import MapView from '@/components/view/MapView';
import AddJamForm from '@/components/form/AddJamForm';
import ProfileForm from '@/components/form/ProfileForm';

export const Screens = {
  settingsMenu: {
    effect: 'push',
    component: () => <SettingsMenu />,
  },
  notificationsMenu: {
    effect: 'fade',
    component: () => <NotificationsMenu />,
  }, 
  searchMenu: {
    effect: 'slide',
    component: () => <SearchMenu />,
  },
  mapView: {
    effect: 'fade',
    component: () => <MapView />,
  },
  addJamForm: {
    effect: 'fade',
    component: () => <AddJamForm />,
  },
  profileForm: {
    effect: 'fade',
    component: () => <ProfileForm />,
  },
};
