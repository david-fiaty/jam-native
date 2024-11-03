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

export const Screens = [
  {
    name: 'JamsList', 
    effect: 'fade',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: <JamsList />,
  },
  {
    name: 'MapView', 
    effect: 'fade',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: <MapView />,
  },
  {
    name: 'AddJamForm', 
    effect: 'fade',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: <AddJamForm />,
  },
  {
    name: 'ProfileForm', 
    effect: 'fade',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: <ProfileForm />,
  },
  {
    name: 'SettingsMenu', 
    effect: 'fade',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: <SettingsMenu />,
  },
  {
    name: 'NotificationsMenu', 
    effect: 'fade',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: <NotificationsMenu />,
  },
  {
    name: 'SearchView', 
    effect: 'fade',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: <SearchView />,
  },
  {
    name: 'JammersList', 
    effect: 'slide',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: <JammersList />,
  },
  {
    name: 'HostsList', 
    effect: 'slide',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: <HostsList />,
  },
  {
    name: 'SaveJamView', 
    effect: 'slide',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: <SaveJamView />,
  },
  {
    name: 'ShareJamView', 
    effect: 'slide',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: <ShareJamView />,
  },
  {
    name: 'MoreJamView', 
    effect: 'slide',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: <MoreJamView />,
  },  {
    name: 'AboutScreen', 
    effect: 'fade',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: null,
  },
  {
    name: 'LegalScreen', 
    effect: 'slide',
    active: false,
    headerNavigation: true,
    footerNavigation: true,
    entityId: null,
    component: null,
  },
];
