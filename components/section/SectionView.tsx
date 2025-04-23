import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import BoxView from '../view/BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import ModalView from "../modal/ModalView";
import SectionManager from "@/manager/SectionManager";
import SectionBackButton from "./navigation/SectionBackButton";
import { Layout } from "@/constants/Layout";

type Props = {
  sectionId?: any;
};

const SectionView = ({ sectionId }: Props) => { 
  sectionId = sectionId || 'welcome';
  SectionManager.setActiveSectionId(sectionId);

  const currentSection: any = SectionManager.getSection(sectionId);

  return (
    <>
      {currentSection.showHeader === true && <SectionHeader style={styles.header} />}

      {currentSection.showTitle === true 
        && currentSection.showBackButton === true 
        && <SectionBackButton currentSection={currentSection} />}

      <BoxView
        direction="column"
        align="center"
        justify="center"
        style={styles.container}
      >
        {currentSection?.render()}
  
        <ModalView />
      </BoxView>
      
      {currentSection.showFooter === true && <SectionFooter style={styles.footer} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    //paddingHorizontal: Layout.space.base*2,
  },
  header: {
    //paddingHorizontal: Layout.space.base*2,
  },
  footer: {

  }
});

export default SectionView;