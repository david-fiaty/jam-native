import React, { useState, useEffect } from "react";
import { BackHandler, StyleSheet, TouchableOpacity } from 'react-native';
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
    return true;
  };

  const getCurrentSection = () => {
    let activeSections: any = sectionState.active;
    let targetSection: any = activeSections[activeSections.length - 1];

    return targetSection;
  };

  useEffect(() => {
    setCurrentSection(getCurrentSection());
  }, [sectionState]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => backHandler.remove();
  }, []);

  return !!currentSection?.title && (
    <BoxView
      direction="row"
      align="center"
      justify="space-between"
      style={styles.container}
    >
      <BoxView
        direction="row"
        align="center"
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
      </BoxView>

      {Object.keys(currentSection?.toolbarButton || {})?.length > 0 && (
        <BoxView direction="row" align="center" justify="flex-end" style={styles.toolbar}>
            <TouchableOpacity
              onPress={() => SectionManager.push(router, currentSection?.toolbarButton?.sectionId, currentSection?.params)}
            >
              <TextView underline={true}>{currentSection?.toolbarButton?.label}</TextView>
            </TouchableOpacity>
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
  },
});

export default SectionBackButton;
