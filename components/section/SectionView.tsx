import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import BoxView from '../view/BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import ModalView from "../modal/ModalView";
import SectionManager from "@/manager/SectionManager";
import SectionBackButton from "./navigation/SectionBackButton";
import ModalManager from '@/manager/ModalManager';

type Props = {
  sectionId?: any;
};

const SectionView = ({ sectionId }: Props) => { 
  const [currentSection, setCurrentSection] = useState<any>(null);

  sectionId = sectionId || 'welcome';
  SectionManager.setActiveSection(sectionId);

  const renderSection = () => {
    return SectionManager.getSection(sectionId).render();
  };

  useEffect(() => {
    setCurrentSection(SectionManager.getActiveSection());
  });

  return (
    <>
      {currentSection.showHeader === true && <SectionHeader />}

      {currentSection.showTitle === true 
        && currentSection.showBackButton === true 
        && <SectionBackButton currentSection={currentSection} />}

      <BoxView
        direction="column"
        align="center"
        justify="center"
        style={styles.container}
      >
        {renderSection()}
  
        <ModalView />
      </BoxView>
      
      {currentSection.showFooter === true && <SectionFooter />}
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