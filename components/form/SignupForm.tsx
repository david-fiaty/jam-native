import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from '../view/BoxView';
import LogoView from '../view/LogoView';
import TextView from '../view/TextView';


const SignupForm = () => {
  return (
    <BoxView direction="column" align="center" justify="center" style={Layout.screenContent}>
      <LogoView size={80} />    
      <TextView style={styles.slogan}>{i18n.t('Create a jam account')}</TextView> 
    </BoxView>
  );
};

const styles = StyleSheet.create({
  slogan: {
    textTransform: 'uppercase',
    fontSize: Layout.fontSize.base,
  }
});

export default SignupForm;