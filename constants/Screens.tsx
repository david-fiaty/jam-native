import SettingsMenu from '@/components/menu/SettingsMenu';
import NotificationsMenu from '@/components/menu/NotificationsMenu';
import SearchMenu from '@/components/menu/SearchMenu';
import MapView from '@/components/view/MapView';
import AddJamForm from '@/components/form/AddJamForm';
import ProfileForm from '@/components/form/ProfileForm';

export const Screens = {
  settingsMenu: {
    effect: 'fade',
    axis: 'x',
    component: () => <SettingsMenu />,
  },
  notificationsMenu: {
    effect: 'fade',
    axis: 'x',
    component: () => <NotificationsMenu />,
  }, 
  searchMenu: {
    effect: 'slide',
    axis: 'y',
    component: () => <SearchMenu />,
  },
  mapView: {
    effect: 'fade',
    axis: 'x',
    component: () => <MapView />,
  },
  addJamForm: {
    effect: 'fade',
    axis: 'x',
    component: () => <AddJamForm />,
  },
  profileForm: {
    effect: 'fade',
    axis: 'x',
    component: () => <ProfileForm />,
  },
};
