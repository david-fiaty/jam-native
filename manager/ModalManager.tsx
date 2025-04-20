import { setModalId } from "@/redux/slices/ModalSlice";
import Store from "@/redux/Store";
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

class ModalManager {

  toggleModal(modalId: string) {

  }

  setActiveModalId(modalId: string) {
    Store.dispatch(setModalId(modalId));
  }

  getActiveModal() {
    let modalId: any = this.getActiveModalId();
    let section: any = this.getModal(modalId);

    return section;
  }

  getActiveModalId() {
    return Store.getState().modal.modalId;
  }

  getModal(modalId: string) {
    return this.getModals().find((o: any) => o.id === modalId);
  }

  getModals() {
    return [
      {
        name: 'JamsMapView', 
        render: () => <JamsMapView />,
      },
      {
        name: 'JamForm', 
        render: () => <JamForm />,
      },
      {
        name: 'AddProjectForm', 
        render: () => <AddProjectForm />,
      },
      {
        name: 'SelectJamsForm', 
        render: () => <SelectJamsForm />,
      },
      {
        name: 'AddJamToProjectForm', 
        render: () => <AddJamToProjectForm />,
      },
      {
        name: 'SettingsMenu', 
        render: () => <SettingsMenu />,
      },
      {
        name: 'NotificationsMenu', 
        render: () => <NotificationsMenu />,
      },
      {
        name: 'SearchView', 
        render: () => <SearchView />,
      },
      {
        name: 'LocationMapView', 
        render: () => <LocationMapView />,
      },
      {
        name: 'JammersList',
        render: () => <JammersList />,
      },
      {
        name: 'CollaboratorsList', 
        render: () => <CollaboratorsList />,
      },
      {
        name: 'SectorsList', 
        render: () => <SectorsList />,
      },
      {
        name: 'CountriesList', 
        render: () => <CountriesList />,
      },
      {
        name: 'HostsList', 
        render: () => <HostsList />,
      },
      {
        name: 'MoreJamActionsView', 
        render: () => <MoreJamActionsView />,
      },
      {
        name: 'ShareOptionsList', 
        render: () => <ShareOptionsList />,
      },
    ];
  }
}

export default (new ModalManager());