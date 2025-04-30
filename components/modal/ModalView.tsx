import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import ModalBackButton from './ModalBackButton';
import i18n from '@/translation/i18n';
import JamForm from "@/components/form/JamForm";
import JamsMapView from "@/components/view/JamsMapView";
import SearchView from "@/components/view/SearchView";
import SettingsMenu from "@/components/menu/SettingsMenu";
import NotificationsMenu from "@/components/menu/NotificationsMenu";
import HostsList from "@/components/list/HostsList";
import MoreJamActionsView from "@/components/view/MoreJamActionsView";
import JammersList from "@/components/list/JammersList";
import SectorsList from "@/components/list/SectorsList";
import LocationMapView from "@/components/view/LocationMapView";
import CollaboratorsList from "@/components/list/CollaboratorsList";

type Props = {
  currentSection?: any;
  style?: any;
};

const ModalView = ({ currentSection, style }: Props) => {
  const [currentModal, setCurrentModal] = useState<any>(null);
  const modalState: any = useSelector((state: any) => state.modal);

  const canShowModal = () => {
    return currentModal !== null && currentModal?.sectionId === currentSection?.id;
  };

  const renderBackButton = () => {
    if (currentModal?.showTitle === true && currentModal?.showBackButton === true) {
      return <ModalBackButton currentModal={currentModal} />;
    }

    return <></>;
  };

  const renderModal = () => {
    let activeModal: any = getActiveModal();

    if (activeModal) {
      return activeModal.render(activeModal.params);
    }

    return <></>;
  };

  const getActiveModal = () => {
    let activeModals: any[] = modalState.active;

    if (activeModals.length > 0) {
      let activeModal: any = activeModals[activeModals.length - 1];
      let modalConfig: any = getModal(activeModal.id);

      if (activeModal && modalConfig) {
        return {
          ...modalConfig,
          ...activeModal,
        }
      }
    }

    return null;
  };

  const getModal = (modalId: any, renderer: boolean = true) => {
    return buildModals(renderer).find((o: any) => o.id === modalId);
  };
  
  const buildModals = (renderer: boolean = true) => {
    let config: any[] = getModals();

    if (!renderer) {
      config = config.map(({ render, ...rest }) => rest);
    }

    return config;
  };

  const getModals = () => {
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
        title: i18n.t('Your location'),
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
  };

  useEffect(() => {
    setCurrentModal(getActiveModal());
  }, [modalState]);

  return (
    <Modal
      coverScreen={false}
      hasBackdrop={false}
      hideModalContentWhileAnimating={true}
      animationIn={currentModal?.effect?.in}
      animationOut={currentModal?.effect?.out}
      isVisible={canShowModal()}
      style={[styles.container, style]}
    >
      {renderBackButton()}

      {renderModal()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 0,
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default ModalView;
