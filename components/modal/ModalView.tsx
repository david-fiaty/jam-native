import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, shallowEqual } from "react-redux";
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
import SelectLocationMapView from "@/components/view/SelectLocationMapView";
import CollaboratorsList from "@/components/list/CollaboratorsList";
import CountriesList from '../list/CountriesList';
import SelectProjectJamsForm from '../form/SelectProjectJamsForm';
import JamCommentsList from '../list/JamCommentsList';
import ProjectCommentsList from '../list/ProjectCommentsList';
import VenueTypesList from '../list/VenueTypesList';
import PrivateProfileSection from '../section/profile/PrivateProfileSection';
import SearchFiltersForm from '../form/SearchFiltersForm';
import PublicJamSection from '../section/jam/PublicJamSection';
import PublicProfileSection from '../section/profile/PublicProfileSection';
import PublicProjectSection from '../section/project/PublicProjectSection';
import PrivateProjectSection from '../section/project/PrivateProjectSection';
import PrivateJamSection from '../section/jam/PrivateJamSection';
import ProfileFormSection from '../section/profile/ProfileFormSection';
import ProfileLocationMapView from '../view/ProfileLocationMapView';
import JamFormSection from '../section/jam/JamFormSection';
import ProjectFormSection from '../section/project/ProjectFormSection';
import OrganizationTypesList from '../list/OrganizationTypesList';
import CulturalActivityTypesList from '../list/CulturalActivityTypesList';
import WeekDaysList from '../list/WeekDaysList';

type Props = {
  currentSection?: any;
  style?: any;
};

const ModalView = ({ currentSection, style }: Props) => {
  const [currentModal, setCurrentModal] = useState<any>(null);
  const modalState: any = useSelector((state: any) => state.modal, shallowEqual);

  const canShowModal = () => {
    return currentModal !== null && currentModal?.sectionId === currentSection?.id;
  };

  const getCurrentModalIndex = () => {
    return modalState.active.findIndex((o: any) => o.id === currentModal?.id);
  };

  const renderBackButton = () => {
    const activeModalsCount: number = modalState.active.length;
    const currentModalIndex: number = getCurrentModalIndex();

    if (currentModal?.showTitle === true && currentModal?.showBackButton === true) {
      return (
        <ModalBackButton
          currentModal={currentModal}
          visible={activeModalsCount !== currentModalIndex}
        />
      );
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
        };
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
        id: 'SearchFiltersForm',
        title: i18n.t('Search filters'),
        render: (params: any) => <SearchFiltersForm {...params} />,
      },
      {
        id: 'JamForm',
        title: i18n.t('Create a Jam'),
        render: (params: any) => <JamForm {...params} />,
      },
      {
        id: 'JamsMapView',
        title: i18n.t('Jams map'),
        render: (params: any) => <JamsMapView {...params} />,
        toolbarButton: {
          label: i18n.t('Filter'),
          icon: 'filter',
          component: 'SearchFiltersForm',
        },
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
        id: 'JamCommentsList',
        title: i18n.t('Comments'),
        render: (params: any) => <JamCommentsList {...params} />,
      },
      {
        id: 'ProjectCommentsList',
        title: i18n.t('Comments'),
        render: (params: any) => <ProjectCommentsList {...params} />,
      },
      {
        id: 'CollaboratorsList',
        title: i18n.t('Collaborators'),
        render: (params: any) => <CollaboratorsList {...params} />,
      },
      {
        id: 'VenueTypesList',
        title: i18n.t('Venue types'),
        render: (params: any) => <VenueTypesList {...params} />,
      },
      {
        id: 'OrganizationTypesList',
        title: i18n.t('Organization types'),
        render: (params: any) => <OrganizationTypesList {...params} />,
      },
      {
        id: 'WeekDaysList',
        title: i18n.t('Week days'),
        render: (params: any) => <WeekDaysList {...params} />,
      },
      {
        id: 'CulturalActivityTypesList',
        title: i18n.t('Cultural activities'),
        render: (params: any) => <CulturalActivityTypesList {...params} />,
      },
      {
        id: 'CountriesList',
        title: i18n.t('Countries'),
        render: (params: any) => <CountriesList {...params} />,
      },
      {
        id: 'SelectLocationMapView',
        title: i18n.t('Your location'),
        render: (params: any) => <SelectLocationMapView {...params} />,
      },
      {
        id: 'ProfileLocationMapView',
        title: i18n.t('Profile location'),
        render: (params: any) => <ProfileLocationMapView {...params} />,
      },
      {
        id: 'SelectProjectJamsForm',
        title: i18n.t('Select project Jams'),
        render: (params: any) => <SelectProjectJamsForm {...params} />,
      },
      {
        id: 'PublicJamSection',
        title: i18n.t('Jam'),
        render: (params: any) => <PublicJamSection {...params} />,
      },
      {
        id: 'PublicProfileSection',
        title: i18n.t('Profile'),
        render: (params: any) => <PublicProfileSection {...params} />,
      },
      {
        id: 'PublicProjectSection',
        title: i18n.t('Project'),
        render: (params: any) => <PublicProjectSection {...params} />,
      },
      {
        id: 'PrivateJamSection',
        title: i18n.t('Your Jam'),
        render: (params: any) => <PrivateJamSection {...params} />,
        editButton: {
          label: i18n.t('Edit'),
          component: 'JamFormSection',
          idField: 'jamId',
        },
      },
      {
        id: 'JamFormSection',
        title: i18n.t('Edit Jam'),
        render: (params: any) => <JamFormSection {...params} />,
      },
      {
        id: 'PrivateProfileSection',
        title: i18n.t('Your profile'),
        render: (params: any) => <PrivateProfileSection {...params} />,
        toolbarButton: {
          label: i18n.t('Edit'),
          component: 'ProfileFormSection',
        },
      },
      {
        id: 'ProfileFormSection',
        title: i18n.t('Your profile'),
        render: (params: any) => <ProfileFormSection {...params} />,
      },
      {
        id: 'PrivateProjectSection',
        title: i18n.t('Your project'),
        render: (params: any) => <PrivateProjectSection {...params} />,
        editButton: {
          label: i18n.t('Edit'),
          component: 'ProjectFormSection',
          idField: 'projectId',
        },
      },
      {
        id: 'ProjectFormSection',
        title: i18n.t('Edit project'),
        render: (params: any) => <ProjectFormSection {...params} />,
      },
    ].map((o: any) => {
      return {
        ...{
          showTitle: true,
          showBackButton: true,
          params: {},
          toolbarButton: {},
          editButton: {},
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
    height: '100%',
    padding: 0,
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default ModalView;
