import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import BoxView from '../view/BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import ModalView from "../modal/ModalView";
import SectionManager from "@/manager/SectionManager";
import SectionBackButton from "./button/SectionBackButton";

type Props = {
  sectionId?: any;
};

const SectionView = ({ sectionId }: Props) => { 
  sectionId = sectionId || 'welcome';
  SectionManager.setActiveSectionId(sectionId);

  const currentSection: any = SectionManager.getSection(sectionId);

  return (
    <>
      {currentSection.showHeader === true && <SectionHeader />}

      {currentSection.showBackButton === true && <SectionBackButton currentSection={currentSection} />}

      <BoxView
        direction="column"
        align="center"
        justify="center"
        style={styles.container}
      >
        {currentSection?.render()}
  
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