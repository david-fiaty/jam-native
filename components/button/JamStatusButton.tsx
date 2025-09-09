import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';

type Props = {
  active?: boolean;
};

const JamStatusButton = ({ active }: Props) => {
  const [labelVisible, setLabelVisible] = useState(false);
  const buttonLabel = active ? i18n.t('active') : i18n.t('inactive');
  const statusStyle = active ? styles.active : styles.inactive;

  return (       
    <TouchableOpacity onPress={() => {setLabelVisible(!labelVisible)}}>
      <BoxView direction="row" align="center" justify="center" style={styles.container}>
        { !labelVisible && <View style={[styles.dot, statusStyle]} /> }
        { labelVisible && <TextView style={[styles.label, statusStyle]}>{buttonLabel}</TextView> }
      </BoxView> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.radius.circle,
    width: Layout.space.base*2.5,
  },
  dot: {
    backgroundColor: Layout.colors.primary,
    width: Layout.space.base*0.75,
    height: Layout.space.base*0.75,
    borderRadius: Layout.radius.round,
  },
  label: {
    width: '100%',
    height: '100%',
    minWidth: 50,
    textAlign: 'center',
    borderRadius: Layout.radius.round,
    color: Layout.colors.white,
    fontSize: 11,
    backgroundColor: Layout.colors.primary,
    paddingTop: 0,
    paddingBottom: 2,
  },
  active: {
    backgroundColor: Layout.colors.primary,
  },
  inactive: {
    backgroundColor: Layout.colors.tertiary,
  },
});

export default JamStatusButton;