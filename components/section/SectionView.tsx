import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
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

const SectionView = () => { 
  const path = usePathname();
  const params = useLocalSearchParams();
  const dispatch = useDispatch();
  const [currentSection, setCurrentSection] = useState<any>(null);
  const sectionState: any = useSelector((state: any) => state.section);
  const sectionId: any = path.split('/').pop();
  const activeSections: any = sectionState.active.includes(sectionId) ? sectionState.active : [...sectionState.active, sectionId];

  useEffect(() => {
    setCurrentSection(SectionManager.getSection(sectionId || Config.defaultSection));
    dispatch(setActiveSections(activeSections));
  }, [sectionId, activeSections]);

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
        {currentSection?.render(params)}
  
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