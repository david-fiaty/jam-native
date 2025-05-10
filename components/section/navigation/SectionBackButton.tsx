import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';
import TextView from '@/components/view/TextView';
import SectionManager from '@/manager/SectionManager';
import i18n from "@/translation/i18n";

const SectionBackButton = () => {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<any>(null);
  const sectionState: any = useSelector((state: any) => state.section);

  const onPress = () => {
    SectionManager.back(router);
  };

  const getCurrentSection = () => {
    let activeSections: any = sectionState.active;
    let targetSection: any = activeSections[activeSections.length - 1];
    
    return targetSection;
  };

  useEffect(() => {
    setCurrentSection(getCurrentSection());
  }, [sectionState]);
  
  return (
    <BoxView
      direction="row"
      align="center"
      justify="flex-start"
      style={styles.container}
      onPress={onPress}
    >
      <IconView
        name="previous"
        theme="clear"
        padding={0}
      />
  
      <TextView style={styles.title}>
        { currentSection?.title }
      </TextView>

      {currentSection.toolbarButtons.length > 0 && currentSection.toolbarButtons.map((o: any, i) => (
        <TouchableOpacity 
          key={`button-${i}`}
          onPress={() => SectionManager.push(router, o.sectionId)}
        >
          <TextView underline={true}>{o.label}</TextView>
        </TouchableOpacity>
      ))}

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    padding: Layout.space.base,
    paddingLeft: Layout.space.base*1.5,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default SectionBackButton;
