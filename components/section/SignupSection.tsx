import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { setValue } from '@/redux/slices/SignupSlice';
import { Layout } from '@/constants/Layout';
import SignupCodeForm from '../form/signup-form/SignupCodeForm';
import SignupEmailForm from '../form/signup-form/SignupEmailForm';
import ProfileForm from '../form/ProfileForm';
import LogoView from '../view/LogoView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';

const SignupSection = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.signup);

  const resetForm = () => {
    dispatch(setValue(null));
  }

  useEffect(() => {
    (async () => {
        if (!isLoaded) {
          //resetForm(); Todo - Enable this and fix reset issue
          setIsLoaded(true);
        }
    })();
  }, [isLoaded]);

  return (
    <BoxView 
      align="center" 
      justify="center" 
      scroll={true} 
      style={[Layout.formContainer, styles.container]}
    >    
      <LogoView size={80} />    
      <TextView style={styles.slogan}>{i18n.t('Create your JAM account')}</TextView> 
      
      {formData?.success !== true && <SignupEmailForm />}
      {formData?.success !== true && formData?.session?.length > 0 && <SignupCodeForm />}
      {formData?.success === true && <ProfileForm />}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    
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