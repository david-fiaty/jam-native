import SettingsMenu from '@/components/menu/SettingsMenu';
import NotificationsMenu from '@/components/menu/NotificationsMenu';
import SearchMenu from '@/components/menu/SearchMenu';
import MapView from '@/components/view/MapView';
import AddJamForm from '@/components/form/AddJamForm';
import ProfileForm from '@/components/form/ProfileForm';

export const Screens = {
  settingsMenu: {
    effect: 'fade',
    axis: null,
    component: () => <SettingsMenu />,
  },
  notificationsMenu: {
    effect: 'fade',
    axis: null,
    component: () => <NotificationsMenu />,
  }, 
  searchMenu: {
    effect: 'slide',
    axis: 'y',
    component: () => <SearchMenu />,
  },
  mapView: {
    effect: 'fade',
    axis: null,
    component: () => <MapView />,
  },
  addJamForm: {
    effect: 'fade',
    axis: null,
    component: () => <AddJamForm />,
  },
  profileForm: {
    effect: 'fade',
    axis: null,
    component: () => <ProfileForm />,
  },
};
