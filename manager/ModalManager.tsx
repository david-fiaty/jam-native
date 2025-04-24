import { setActiveModals } from "@/redux/slices/ModalSlice";
import Store from "@/redux/Store";
import JamForm from "@/components/form/JamForm";
import i18n from "@/translation/i18n";
import JamsMapView from "@/components/view/JamsMapView";
import SearchView from "@/components/view/SearchView";
import SettingsMenu from "@/components/menu/SettingsMenu";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import HostsList from "@/components/list/HostsList";
import MoreJamActionsView from "@/components/view/MoreJamActionsView";
import JammersList from "@/components/list/JammersList";
import SectorsList from "@/components/list/SectorsList";
import LocationMapView from "@/components/view/LocationMapView";
import CollaboratorsList from "@/components/list/_CollaboratorsList";

class ModalManager {
  toggleModal(modalId: string, params?: any) {
    params = params || {};
    let activeModals: any[] = [...Store.getState().modal.active];
    let activeSections: any[] = [...Store.getState().section.active];
    let sectionId: any = null;

    if (activeSections.length > 0) {
      sectionId = activeSections[activeSections.length - 1];
    }

    if (activeModals.length > 0 && activeModals[activeModals.length - 1].id === modalId) {
      activeModals.pop();
    } 
    else {
      activeModals.push({
        ...this.getModal(modalId, false), 
        ...{ params: params },
        ...{ sectionId: sectionId },
      });
    }

    Store.dispatch(setActiveModals(activeModals));
  }

  getModal(modalId: any, renderer: boolean = true) {
    return this.getModals(renderer).find((o: any) => o.id === modalId);
  }

  getModals(renderer: boolean = true) {
    let config: any[] = this.getConfig();

    if (!renderer) {
      config = config.map(({ render, ...rest }) => rest);
    }

    return config;
  }

  getConfig() {
    return [
      {
        id: 'JamForm',
        title: i18n.t('Create a jam'),
        render: (params: any) => <JamForm {...params} />,
      },
      {
        id: 'JamsMapView',
        title: i18n.t('Jams map'),
        render: (params: any) => <JamsMapView {...params} />,
      },
      {
        id: 'SearchView',
        title: i18n.t('Search'),
        render: (params: any) => <SearchView {...params} />,
      },
      {
        id: 'SettingsMenu',
        title: i18n.t('Settings'),
        render: (params: any) => <SettingsMenu {...params} />,
      },
      {
        id: 'NotificationsMenu',
        title: i18n.t('Notifications'),
        render: (params: any) => <NotificationsMenu {...params} />,
      },
      {
        id: 'HostsList',
        title: i18n.t('Jam hosts'),
        render: (params: any) => <HostsList {...params} />,
      },
      {
        id: 'MoreJamActionsView',
        title: i18n.t('More actions'),
        render: (params: any) => <MoreJamActionsView {...params} />,
      },
      {
        id: 'JammersList',
        title: i18n.t('Jammers'),
        render: (params: any) => <JammersList {...params} />,
      },
      {
        id: 'SectorsList',
        title: i18n.t('Sectors'),
        render: (params: any) => <SectorsList {...params} />,
      },
      {
        id: 'CollaboratorsList',
        title: i18n.t('Collaborators'),
        render: (params: any) => <CollaboratorsList {...params} />,
      },
      {
        id: 'LocationMapView',
        title: i18n.t('LocationMapView'),
        render: (params: any) => <LocationMapView {...params} />,
      },
    ].map((o: any) => {
      return {
        ...{
          showTitle: true,
          showBackButton: true,
          params: {},
          sectionId: null,
          effect: {
            in: 'slideInUp', 
            out: 'slideOutDown',
          },
        },
        ...o,
      };
    });
  }
}

export default (new ModalManager());