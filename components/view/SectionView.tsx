import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from 'expo-router';
import { setActiveSections, setSectionConfig } from "@/redux/slices/SectionSlice";
import { StyleSheet } from 'react-native';
import { Layout } from "@/constants/Layout";
import BoxView from '../view/BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import ModalView from "../modal/ModalView";
import SectionBackButton from "../section/navigation/SectionBackButton";
import MessageView from "../view/MessageView";
import i18n from "@/translation/i18n";
import AboutSection from "@/components/section/AboutSection";
import JamsSection from "@/components/section/JamsSection";
import LegalSection from "@/components/section/LegalSection";
import LoginSection from "@/components/section/LoginSection";
import WelcomeSection from "@/components/section/WelcomeSection";
import SignupSection from "@/components/section/SignupSection";
import PrivacySection from "@/components/section/PrivacySection";
import ProfileFormSection from "@/components/section/profile/ProfileFormSection";
import ProjectForm from "@/components/form/ProjectForm";
import LanguageForm from "../form/LanguageForm";
import ResetPasswordForm from "../form/ResetPasswordForm";
import NotificationItemSection from "../section/NotificationItemSection";
import PublicProfileSection from "../section/profile/PublicProfileSection";
import PrivateProfileSection from "../section/profile/PrivateProfileSection";
import ProfileJamsSection from "../section/ProfileJamsSection";
import JamForm from "../form/JamForm";
import PublicProjectSection from "../section/project/PublicProjectSection";
import PrivateProjectSection from "../section/project/PrivateProjectSection";
import ProjectJamsSection from "../section/ProjectJamsSection";
import ProfileProjectsSection from "../section/ProfileProjectsSection";

const SectionView = () => {
  const path = usePathname();
  const dispatch = useDispatch();
  const [currentSection, setCurrentSection] = useState<any>(null);
  const sectionState: any = useSelector((state: any) => state.section);
  const modalState: any = useSelector((state: any) => state.modal);
  const userState: any = useSelector((state: any) => state.user);
  const sectionId: any = path.split('/').pop();

  const getCurrentSection = () => {
    let activeSections: any[] = [...sectionState.active];
    let targetSection: any = getSection(sectionId);

    return {
      ...targetSection,
      ...activeSections[activeSections.length - 1],
    };
  };

  const isModalTitleVisible = () => {
    return modalState.active.length > 0 && modalState[modalState.active.length - 1]?.showTitle === true;
  };

  const showBackButton = () => {
    return currentSection?.showTitle === true
      && currentSection?.showBackButton === true
      && (!modalState.active.length || !isModalTitleVisible());
  };

  const getDefaultSection = (renderer: boolean = true) => {
    return getSections(renderer).find((o: any) => o.default === true);
  };

  const getSection = (sectionId: any, renderer: boolean = true) => {
    if (sectionId) {
      return getSections(renderer).find((o: any) => o.id === sectionId);
    }
    else {
      return getDefaultSection(renderer);
    }
  };

  const getSections = (renderer: boolean = true) => {
    let config: any[] = getConfig();

    if (!renderer) {
      config = config.map(({ render, ...rest }) => rest);
    }

    return config;
  };

  const getConfig = () => {
    return [
      {
        id: 'welcome',
        title: i18n.t('Welcome'),
        showTitle: false,
        showHeader: false,
        showFooter: false,
        showBackButton: false,
        default: true,
        render: (params: any) => <WelcomeSection {...params} />,
      },
      {
        id: 'login',
        title: i18n.t('Login'),
        showTitle: false,
        showHeader: false,
        showFooter: false,
        showBackButton: false,
        render: (params: any) => <LoginSection {...params} />,
      },
      {
        id: 'signup',
        title: i18n.t('Signup'),
        showTitle: false,
        showHeader: false,
        showFooter: false,
        showBackButton: false,
        render: (params: any) => <SignupSection {...params} />,
      },
      {
        id: 'about',
        title: i18n.t('About'),
        showFooter: false,
        backButtonRoute: '/welcome',
        render: (params: any) => <AboutSection {...params} />,
      },
      {
        id: 'legal',
        title: i18n.t('Legal'),
        showFooter: false,
        backButtonRoute: '/welcome',
        render: (params: any) => <LegalSection {...params} />,
      },
      {
        id: 'privacy',
        title: i18n.t('Privacy'),
        showFooter: false,
        backButtonRoute: '/welcome',
        render: (params: any) => <PrivacySection {...params} />,
      },
      {
        id: 'jams',
        title: i18n.t('Jams'),
        showBackButton: false,
        render: (params: any) => <JamsSection {...params} />,
      },
      {
        id: 'profile-jams',
        title: i18n.t('Profile Jams'),
        showBackButton: true,
        render: (params: any) => <ProfileJamsSection {...params} />,
      },
      {
        id: 'profile-projects',
        title: i18n.t('Profile Projects'),
        showBackButton: true,
        render: (params: any) => <ProfileProjectsSection {...params} />,
      },
      {
        id: 'project-jams',
        title: i18n.t('Project Jams'),
        showBackButton: true,
        render: (params: any) => <ProjectJamsSection {...params} />,
      },
      {
        id: 'notification-item',
        title: i18n.t('Notification'),
        showBackButton: true,
        render: (params: any) => <NotificationItemSection {...params} />,
      },
      {
        id: 'public-profile',
        title: i18n.t('Profile'),
        render: (params: any) => <PublicProfileSection {...params} />,
      },
      {
        id: 'private-profile',
        title: i18n.t('Your profile'),
        render: (params: any) => <PrivateProfileSection {...params} />,
        toolbarButtons: [
          {
            label: i18n.t('Edit'),
            sectionId: 'profile-form',
          },
        ],
      },
      {
        id: 'profile-form',
        title: i18n.t('Edit Profile'),
        render: (params: any) => <ProfileFormSection {...params} />,
      },
      {
        id: 'public-project',
        title: i18n.t('Project'),
        render: (params: any) => <PublicProjectSection {...params} />,
      },
      {
        id: 'private-project',
        title: i18n.t('Your project'),
        render: (params: any) => <PrivateProjectSection {...params} />,
        toolbarButtons: [
          {
            label: i18n.t('Edit'),
            sectionId: 'project-form',
          },
        ],
      },
      {
        id: 'profile-form',
        title: i18n.t('Edit Profile'),
        render: (params: any) => <ProfileFormSection {...params} />,
      },
      {
        id: 'reset-password',
        title: i18n.t('Reset password'),
        render: (params: any) => <ResetPasswordForm {...params} />,
      },
      {
        id: 'language',
        title: i18n.t('Change language'),
        render: (params: any) => <LanguageForm {...params} />,
      },
      {
        id: 'project-form',
        title: i18n.t('Add project'),
        render: (params: any) => <ProjectForm {...params} />,
      },
      {
        id: 'jam-form',
        title: i18n.t('Add Jam'),
        render: (params: any) => <JamForm {...params} />,
      },
    ].map((o: any) => {
      return {
        ...{
          showTitle: true,
          showHeader: true,
          showFooter: true,
          showBackButton: true,
          backButtonRoute: null,
          params: {},
          toolbarButtons: [],
        },
        ...o,
      };
    });
  };

  useEffect(() => {
    setCurrentSection(getCurrentSection());

    if (!sectionState.config.length) {
      dispatch(setSectionConfig(getSections(false)));
    }

    if (!sectionState.active?.length) {
      dispatch(setActiveSections([getDefaultSection(false)]));
    }
  }, [sectionId, sectionState, userState]);

  return (
    <>
      <MessageView />
      {currentSection?.showHeader === true && <SectionHeader style={styles.header} />}
      {showBackButton() === true && <SectionBackButton />}

      <BoxView
        direction="column"
        align="center"
        justify="center"
        style={styles.container}
      >
        {currentSection?.render(currentSection?.params || {})}

        <ModalView currentSection={currentSection} style={styles.modal} />
      </BoxView>

      {currentSection?.showFooter === true && <SectionFooter style={styles.footer} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.colors.white,
    paddingHorizontal: Layout.space.base * 1.5,
  },
  modal: {
    paddingHorizontal: Layout.space.base * 1.5,
    backgroundColor: Layout.colors.white,
    zIndex: 10,
  },
  header: {
    paddingHorizontal: Layout.space.base * 1.5,
    zIndex: 20,
  },
  footer: {
    zIndex: 20,
  },
});

export default SectionView;