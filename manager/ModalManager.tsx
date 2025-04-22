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

class ModalManager {
  getActiveModal() {
    let activeModals: any[] = [...Store.getState().modal.active];

    if (activeModals.length > 0) {
      return activeModals.pop();
    }

    return null;
  }

  toggleModal(modalId: string, params?: any) {
    let activeModals: any[] = [...Store.getState().modal.active];

    if (activeModals.length > 0 && activeModals[activeModals.length - 1].id === modalId) {
      activeModals.pop();
    } 
    else {
      activeModals.push({
        ...this.getModal(modalId, false), 
        ...{ params: params },
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
        render: () => <JamForm />,
      },
      {
        id: 'JamsMapView',
        title: i18n.t('Jams map'),
        render: () => <JamsMapView />,
      },
      {
        id: 'SearchView',
        title: i18n.t('Search'),
        render: () => <SearchView />,
      },
      {
        id: 'SettingsMenu',
        title: i18n.t('Settings'),
        render: () => <SettingsMenu />,
      },
      {
        id: 'NotificationsMenu',
        title: i18n.t('Notifications'),
        render: () => <NotificationsMenu />,
      },
      {
        id: 'HostsList',
        title: i18n.t('Jam hosts'),
        render: () => <HostsList />,
      },
      {
        id: 'MoreJamActionsView',
        title: i18n.t('More actions'),
        render: () => <MoreJamActionsView />,
      },
      {
        id: 'JammersList',
        title: i18n.t('Jammers'),
        render: () => <JammersList />,
      },
    ].map((o: any) => {
      return {
        ...{
          showTitle: true,
          showBackButton: true,
          params: {},
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