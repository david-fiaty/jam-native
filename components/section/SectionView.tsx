import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from 'expo-router';
import { setActiveSections, setSectionConfig } from "@/redux/slices/SectionSlice";
import { StyleSheet } from 'react-native';
import { Layout } from "@/constants/Layout";
import BoxView from '../view/BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import ModalView from "../modal/ModalView";
import SectionBackButton from "./navigation/SectionBackButton";
import MessageView from "../view/MessageView";
import Sections from "@/constants/Sections";

const SectionView = () => { 
  const dispatch = useDispatch();
  const path = usePathname();
  const [currentSection, setCurrentSection] = useState<any>(null);
  const sectionState: any = useSelector((state: any) => state.section);
  const modalState: any = useSelector((state: any) => state.modal);
  const sectionId: any = path.split('/').pop();

  const getCurrentSection = () => {
    let activeSections: any[] = [...sectionState.active];
    let targetSection: any = getSection(sectionId);

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
  
  const getDefaultSection = (renderer: boolean = true) => {
    return Sections.getSections(renderer).find((o: any) => o.default === true);
  };

  const getSection = (sectionId: any, renderer: boolean = true) => {
    if (sectionId) { 
      return Sections.getSections(renderer).find((o: any) => o.id === sectionId);
    }
    else {
      return getDefaultSection(renderer);
    }
  };

  useEffect(() => {
    setCurrentSection(getCurrentSection());

    if (!sectionState.config.length) {
      dispatch(setSectionConfig(Sections.getSections(false)));
    }

    if (!sectionState.active?.length) {
      dispatch(setActiveSections([getDefaultSection(false)]));
    }
  }, [sectionId, sectionState]);

  return (
    <>
      <MessageView />
      {currentSection?.showHeader === true && <SectionHeader style={styles.header} />}
      {showBackButton() === true && <SectionBackButton />}

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
    backgroundColor: Layout.colors.white,
    paddingHorizontal: Layout.space.base*1.5,
  },
  modal: {
    paddingHorizontal: Layout.space.base*1.5,
    backgroundColor: Layout.colors.white,
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