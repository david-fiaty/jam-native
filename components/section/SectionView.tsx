import React, { useState } from "react";
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import BoxView from '../view/BoxView';
import SectionHeader from '../section/navigation/SectionHeader';
import SectionFooter from '../section/navigation/SectionFooter';
import SectionModal from '../section/modal/SectionModal';
import SectionManager from "@/manager/SectionManager";

type Props = {
  id?: any;
};

const SectionView = ({ id }: Props) => {
  const [currentSection, setCurrentSection] = useState(null);  

  const sections: any = SectionManager.getSections();

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