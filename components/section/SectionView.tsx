import React, { useState } from "react";
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import BoxView from '../view/BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import SectionModal from '../section/modal/SectionModal';
import SectionManager from "@/manager/SectionManager";

type Props = {
  sectionId?: any;
};

const SectionView = ({ sectionId }: Props) => { 
  sectionId = sectionId || 'welcome';
  SectionManager.setActiveSectionId(sectionId);

  const currentSection: any = SectionManager.getSection(sectionId);

  return (
    <>
      {currentSection.header === true && <SectionHeader />}

      <BoxView
        direction="column"
        align="center"
        justify="center"
        style={styles.container}
      >
        {currentSection?.render()}
  
        <SectionModal />
      </BoxView>
      
      {currentSection.footer === true && <SectionFooter />}
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