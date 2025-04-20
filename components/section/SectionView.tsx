import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import BoxView from '../view/BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import ModalView from "../modal/ModalView";
import SectionManager from "@/manager/SectionManager";
import TextView from "../view/TextView";
import IconView from "../view/IconView";

type Props = {
  sectionId?: any;
};

const SectionView = ({ sectionId }: Props) => { 
  sectionId = sectionId || 'welcome';
  SectionManager.setActiveSectionId(sectionId);

  const router = useRouter();
  const currentSection: any = SectionManager.getSection(sectionId);

  return (
    <>
      {currentSection.showHeader === true && <SectionHeader />}

      <BoxView 
        direction="row" 
        align="center"
        justify="flex-start" 
        style={styles.backButtonContainer}
        onPress={() => router.back()}
      >        
        <IconView 
          name="previous" 
          theme="clear" 
          padding={0} 
        />

        <TextView>BackButton</TextView>
        
      </BoxView>

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
  backButtonContainer: {
    backgroundColor: 'red',
    width: '100%'
  },
});

export default SectionView;