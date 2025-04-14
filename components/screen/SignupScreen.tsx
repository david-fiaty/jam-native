import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "@/redux/slices/SignupSlice";
import { Layout } from '@/constants/Layout';
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import SignupForm from '../form/SignupForm';

const SignupScreen = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    if (!isLoaded) {
      dispatch(setValue(null));
      setIsLoaded(true);
    }
  }, [isLoaded]);

  return (
    <BoxView 
      direction="column" 
      align="center" 
      justify="center" 
      style={Layout.screenContent}
    >
      <LogoView size={80} />    
      <TextView style={styles.slogan}>{i18n.t('Create your JAM account')}</TextView> 
      <SignupForm />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  slogan: {
    textTransform: 'uppercase',
    fontSize: Layout.fontSize.base,
  }
});

export default SignupScreen;
