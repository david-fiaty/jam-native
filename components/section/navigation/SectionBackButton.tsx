import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, shallowEqual } from "react-redux";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';
import TextView from '@/components/view/TextView';
import SectionManager from '@/manager/SectionManager';

const SectionBackButton = () => {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<any>(null);
  const sectionState: any = useSelector((state: any) => state.section, shallowEqual);

  const onBackPress = () => {
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

  return !!currentSection?.title && (
    <BoxView
      direction="row"
      align="center"
      justify="flex-start"
      style={styles.container}
      onPress={onBackPress}
    >
      <IconView
        name="previous"
        theme="clear"
        padding={0}
      />

      <TextView style={styles.title}>
        {currentSection?.title}
      </TextView>

      {currentSection?.toolbarButtons?.length > 0 && (
        <BoxView direction="row" align="center" justify="flex-end" style={styles.toolbar}>
          {currentSection.toolbarButtons.map((o: any, i: number) => (
            <TouchableOpacity
              key={`button-${i}`}
              onPress={() => SectionManager.push(router, o.sectionId, currentSection?.params)}
            >
              <TextView underline={true}>{o.label}</TextView>
            </TouchableOpacity>
          ))}
        </BoxView>
      )}

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Layout.colors.white,
    padding: Layout.space.base,
    paddingLeft: Layout.space.base * 1.5,
  },
  title: {
    fontWeight: 'bold',
  },
  toolbar: {
    flex: 1,
    paddingRight: Layout.space.base,
  },
});

export default SectionBackButton;
