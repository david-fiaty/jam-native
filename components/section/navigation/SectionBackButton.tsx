import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import Store from "@/redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSections } from "@/redux/slices/SectionSlice";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';
import TextView from '@/components/view/TextView';

type Props = {
  currentSection: any;
};

const SectionBackButton = ({ currentSection }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const sectionState: any = useSelector((state: any) => state.section);

  const previousSection = () => {
    let activeSections: any = [...sectionState.active];
    let previousSectionIndex: number = 0;

    if (activeSections.length > 1) previousSectionIndex = activeSections.length - 2;
    else if (activeSections.length > 0) previousSectionIndex = activeSections.length - 1;

    if (activeSections.length > 0) {
      activeSections.pop();
      Store.dispatch(setActiveSections(activeSections));
    }
      
    router.dismissTo(`/${activeSections[previousSectionIndex]}`);
  }; 
  
  return (
    <BoxView
      direction="row"
      align="center"
      justify="flex-start"
      style={styles.container}
      onPress={() => previousSection()}
    >
      <IconView
        name="previous"
        theme="clear"
        padding={0}
      />
  
      <TextView>{currentSection.title}</TextView>

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '100%',
    padding: Layout.space.base,
    paddingLeft: 0,
  },
});

export default SectionBackButton;
