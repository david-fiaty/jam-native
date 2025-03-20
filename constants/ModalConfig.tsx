import AddJamToProjectForm from "@/components/form/AddJamToProjectForm";
import AddProjectForm from "@/components/form/AddProjectForm";
import JamForm from "@/components/form/JamForm";
import SelectJamsForm from "@/components/form/SelectJamsForm";
import CollaboratorsList from "@/components/list/CollaboratorsList";
import CountriesList from "@/components/list/CountriesList";
import HostsList from "@/components/list/HostsList";
import JammersList from "@/components/list/JammersList";
import SectorsList from "@/components/list/SectorsList";
import ShareOptionsList from "@/components/list/ShareOptionsList";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import SettingsMenu from "@/components/menu/SettingsMenu";
import JamsMapView from "@/components/view/JamsMapView";
import LocationMapView from "@/components/view/LocationMapView";
import MoreJamActionsView from "@/components/view/MoreJamActionsView";
import SearchView from "@/components/view/SearchView";

const modals: any = [
  {
    name: 'JamsMapView', 
    component: <JamsMapView />,
  },
  {
    name: 'JamForm', 
    component: <JamForm />,
  },
  {
    name: 'AddProjectForm', 
    component: <AddProjectForm />,
  },
  {
    name: 'SelectJamsForm', 
    component: <SelectJamsForm />,
  },
  {
    name: 'AddJamToProjectForm', 
    component: <AddJamToProjectForm />,
  },
  {
    name: 'SettingsMenu', 
    component: <SettingsMenu />,
  },
  {
    name: 'NotificationsMenu', 
    component: <NotificationsMenu />,
  },
  {
    name: 'SearchView', 
    component: <SearchView />,
  },
  {
    name: 'LocationMapView', 
    component: <LocationMapView />,
  },
  {
    name: 'JammersList',
    component: <JammersList />,
  },
  {
    name: 'CollaboratorsList', 
    component: <CollaboratorsList />,
  },
  {
    name: 'SectorsList', 
    component: <SectorsList />,
  },
  {
    name: 'CountriesList', 
    component: <CountriesList />,
  },
  {
    name: 'HostsList', 
    component: <HostsList />,
  },
  {
    name: 'MoreJamActionsView', 
    component: <MoreJamActionsView />,
  },
  {
    name: 'ShareOptionsList', 
    component: <ShareOptionsList />,
  },
];

const defaults: any = {
  params: {},
  effects: {
    in: 'slideInUp', 
    out: 'slideOutDown',
  },
};

const navigation: any = {
  showHeader: true,
  showFooter: true,
  showHeaderButtons: true,
  showHeaderSearch: true,
};

class ModalConfig {
  build() {
    return modals.map((o: any) => ({...defaults, ...navigation, ...o}));
  }
};

export default (new ModalConfig());
