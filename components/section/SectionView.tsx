import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from 'expo-router';
import { setActiveSections } from "@/redux/slices/SectionSlice";
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import BoxView from '../view/BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import ModalView from "../modal/ModalView";
import SectionBackButton from "./navigation/SectionBackButton";
import SectionManager from "@/manager/SectionManager";
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

const SectionView = () => { 
  const path = usePathname();
  const dispatch = useDispatch();
  const [currentSection, setCurrentSection] = useState<any>(null);
  const sectionState: any = useSelector((state: any) => state.section);
  const sectionId: any = path.split('/').pop();

  const getActiveSections = () => {
    return sectionState.active.includes(sectionId) ? sectionState.active : [...sectionState.active, sectionId];
  };
  
  const getSection = (renderer: boolean = true) => {
    return buildSections(renderer).find((o: any) => o.id === sectionId);
  }

  const buildSections = (renderer: boolean = true) => {
    let config: any[] = getSections();

    if (!renderer) {
      config = config.map(({ render, ...rest }) => rest);
    }

    return config;
  };

  const getSections = () => {
    return [
      {
        id: 'welcome',
        title: i18n.t('Welcome'),
        showTitle: false,
        showHeader: false,
        showFooter: false,
        showBackButton: false,
        render: () => <WelcomeSection />,
      },
      {
        id: 'login',
        title: i18n.t('Login'),
        showTitle: false,
        showHeader: false,
        showFooter: false,
        showBackButton: false,
        render: () => <LoginSection />,
      },
      {
        id: 'signup',
        title: i18n.t('Signup'),
        showTitle: false,
        showHeader: false,
        showFooter: false,
        showBackButton: false,
        render: () => <SignupSection />,
      },
      {
        id: 'about',
        title: i18n.t('About'),
        showFooter: false,
        render: () => <AboutSection />,
      },
      {
        id: 'legal',
        title: i18n.t('Legal'),
        showFooter: false,
        render: () => <LegalSection />,
      },
      {
        id: 'privacy',
        title: i18n.t('Privacy'),
        showFooter: false,
        render: () => <PrivacySection />,
      },
      {
        id: 'jams',
        title: i18n.t('Jams'),
        showBackButton: false,
        render: () => <JamsSection />,
      },
      {
        id: 'profile',
        title: i18n.t('Profile'),
        render: () => <ProfileSection />,
      },
      {
        id: 'account',
        title: i18n.t('Account'),
        render: () => <AccountForm />,
      },
      {
        id: 'password',
        title: i18n.t('Password'),
        render: () => <PasswordForm />,
      },
    ].map((o: any) => {
      return {
        ...{
          showTitle: true,
          showHeader: true,
          showFooter: true,
          showBackButton: true,
        },
        ...o,
      };
    });
  };

  useEffect(() => {
    setCurrentSection(getSection(sectionId || Config.defaultSection));
    dispatch(setActiveSections(getActiveSections()));
  }, [sectionId, sectionState]);

  return (
    <>
      <MessageView />
      
      {currentSection?.showHeader === true && <SectionHeader style={styles.header} />}

      {currentSection?.showTitle === true 
        && currentSection?.showBackButton === true 
        && <SectionBackButton currentSection={currentSection} />}

      <BoxView
        direction="column"
        align="center"
        justify="center"
        style={styles.container}
      >
        {currentSection?.render()}
  
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