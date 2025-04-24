import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSectionId } from "@/redux/slices/SectionSlice";
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from "@/constants/Layout";
import BoxView from '../view/BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import ModalView from "../modal/ModalView";
import SectionBackButton from "./navigation/SectionBackButton";
import SectionManager from "@/manager/SectionManager";

type Props = {
  sectionId?: any;
};

const SectionView = ({ sectionId }: Props) => { 
  sectionId = sectionId || 'welcome';

  const dispatch = useDispatch();
  const [currentSection, setCurrentSection] = useState<any>(null);

  useEffect(() => {
    setCurrentSection(SectionManager.getSection(sectionId));
    dispatch(setSectionId(sectionId));
  }, [sectionId]);

  return (
    <>
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
    backgroundColor: 'white',
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