import React, { useState } from "react";
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import WelcomeSection from '../section/WelcomeSection';
import LoginSection from '../section/LoginSection';
import AboutSection from '../section/AboutSection';
import LegalSection from '../section/LegalSection';
import JamsSection from '../section/JamsSection';
import BoxView from '../view/BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import SectionModal from '../section/modal/SectionModal';

type Props = {
  id?: any;
};

const SectionView = ({ id }: Props) => {
  const [currentSection, setCurrentSection] = useState(null);  

  const sections: any = [
    {
      id: 'welcome',
      header: false,
      footer: false,
      render: () => <WelcomeSection />,
    },
    {
      id: 'login',
      header: false,
      footer: false,
      render: () => <LoginSection />,
    },
    {
      id: 'about',
      header: true,
      footer: false,
      render: () => <AboutSection />,
    },
    {
      id: 'legal',
      header: true,
      footer: false,
      render: () => <LegalSection />,
    },
    {
      id: 'jams',
      header: true,
      footer: true,
      render: () => <JamsSection />,
    },
  ];

  return (
    <>
      <SectionHeader />
      <BoxView
        direction="column"
        align="center"
        justify="center"
        style={styles.container}
      >
        {sections.find((o: any) => o.id === (id || 'welcome'))?.render()}

        <SectionModal />
      </BoxView>
      <SectionFooter />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default SectionView;