import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { Layout } from '@/constants/Layout';
import SignupCodeForm from '../form/signup-email/SignupCodeForm';
import SignupEmailForm from '../form/signup-email/SignupEmailForm';
import LogoView from '../view/LogoView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SignupForm from '../form/SignupForm';
import SpinnerView from '../view/SpinnerView';

const resource: string = 'signup';

const SignupSection = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const containerStyle: any = {
    paddingTop: formData?.success === true ? Layout.space.base*4 : 0,
  };

  const resetForm = () => {
    //dispatch(setValue(null));
  }

  useEffect(() => {
    (async () => {
        if (!isLoaded) {
          //resetForm(); Todo - Enable this and fix reset issue
          setIsLoaded(true);
        }
    })();
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView 
      direction="column" 
      align="center" 
      justify="center" 
      style={[styles.container, containerStyle]}
      scroll={formData?.success === true}
    >    
      <LogoView size={80} />    
      <TextView style={styles.slogan}>{i18n.t('Create your JAM account')}</TextView> 
      
      {formData?.success !== true && <SignupEmailForm />}
      {formData?.success !== true && formData?.session?.length > 0 && <SignupCodeForm />}
      {formData?.success === true && <SignupForm />}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  slogan: {
    textTransform: 'uppercase',
    fontSize: Layout.fontSize.base,
  },
  scrollableContainer: {
    paddingTop: Layout.space.base*4,
    paddingBottom: Layout.space.base*10,
    height: '100%',
  },
});

export default SignupSection;