import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from 'expo-router';
import { setSectionConfig } from "@/redux/slices/SectionSlice";
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import BoxView from '../view/BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import ModalView from "../modal/ModalView";
import SectionBackButton from "./navigation/SectionBackButton";
import MessageView from "../view/MessageView";
import i18n from "@/translation/i18n";
import AboutSection from "@/components/section/AboutSection";
import JamsSection from "@/components/section/JamsSection";
import LegalSection from "@/components/section/LegalSection";
import LoginSection from "@/components/section/LoginSection";
import WelcomeSection from "@/components/section/WelcomeSection";
import SignupSection from "@/components/section/SignupSection";
import ProfileSection from "@/components/section/ProfileSection";
import AccountForm from "@/components/form/AccountForm";
import PasswordForm from "@/components/form/PasswordForm";
import PrivacySection from "@/components/section/PrivacySection";
import JamItemSection from "@/components/section/JamItemSection";
import ProfileItemSection from "@/components/section/ProfileItemSection";
import ProjectItemSection from "@/components/section/ProjectItemSection";
import ProfileFormSection from "@/components/section/ProfileFormSection";
import AddProjectForm from "@/components/form/AddProjectForm";

const SectionView = () => { 
  const path = usePathname();
  const dispatch = useDispatch();
  const [currentSection, setCurrentSection] = useState<any>(null);
  const sectionState: any = useSelector((state: any) => state.section);
  const modalState: any = useSelector((state: any) => state.modal);
  const sectionId: any = path.split('/').pop();

  const getCurrentSection = () => {
    let activeSections: any[] = [...sectionState.active];
    let targetSection: any = getSection(sectionId || Config.defaultSection);

    return {
      ...targetSection,
      ...activeSections[activeSections.length - 1],
    };
  };

  const isModalTitleVisible = () => {
    return modalState.active.length > 0 && modalState[modalState.active.length -1]?.showTitle === true;
  };

  const showBackButton = () => {
    return currentSection?.showTitle === true 
      && currentSection?.showBackButton === true 
      && (!modalState.active.length || !isModalTitleVisible());
  };

  const getSection = (sectionId: any, renderer: boolean = true) => {
    return getSections(renderer).find((o: any) => o.id === sectionId);
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
        backButtonRoute: '/',
        render: (params: any) => <AboutSection {...params} />,
      },
      {
        id: 'legal',
        title: i18n.t('Legal'),
        showFooter: false,
        backButtonRoute: '/',
        render: (params: any) => <LegalSection {...params} />,
      },
      {
        id: 'privacy',
        title: i18n.t('Privacy'),
        showFooter: false,
        backButtonRoute: '/',
        render: (params: any) => <PrivacySection {...params} />,
      },
      {
        id: 'jams',
        title: i18n.t('Jams'),
        showBackButton: false,
        render: (params: any) => <JamsSection {...params} />,
      },
      {
        id: 'jam-item',
        title: i18n.t('Jam'),
        showBackButton: true,
        render: (params: any) => <JamItemSection {...params} />,
      },
      {
        id: 'profile-item',
        title: i18n.t('Profile'),
        showBackButton: true,
        render: (params: any) => <ProfileItemSection {...params} />,
      },
      {
        id: 'project-item',
        title: i18n.t('Project'),
        showBackButton: true,
        render: (params: any) => <ProjectItemSection {...params} />,
      },
      {
        id: 'profile',
        title: i18n.t('Your profile'),
        render: (params: any) => <ProfileSection {...params} />,
      },
      {
        id: 'profile-form',
        title: i18n.t('Edit Profile'),
        render: (params: any) => <ProfileFormSection {...params} />,
      },
      {
        id: 'account',
        title: i18n.t('Account'),
        render: (params: any) => <AccountForm {...params} />,
      },
      {
        id: 'password',
        title: i18n.t('Password'),
        render: (params: any) => <PasswordForm {...params} />,
      },
      {
        id: 'add-project',
        title: i18n.t('Add project'),
        render: (params: any) => <AddProjectForm {...params} />,
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
  }, [sectionId, sectionState]);

  return (
    <>
      <MessageView />
      {currentSection?.showHeader === true && <SectionHeader style={styles.header} />}
      {showBackButton() === true && <SectionBackButton currentSection={currentSection} />}

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
    backgroundColor: Colors.white,
    paddingHorizontal: Layout.space.base*1.5,
  },
  modal: {
    paddingHorizontal: Layout.space.base*1.5,
    backgroundColor: Colors.white,
    zIndex: 10,
  },
  header: {
    paddingHorizontal: Layout.space.base*1.5,
    zIndex: 20,
  },
  footer: {
    zIndex: 20,
  },
});

export default SectionView;