import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { Layout } from '@/constants/Layout';
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import SignupForm from '../form/SignupForm';

const SignupScreen = () => {
  const formData = useSelector((state: any) => state.form?.profile);
  
  const isContainerScrollable = () => {
    return formData?.profile_type?.length > 0;
  };

  return (
    <BoxView 
      direction="column" 
      align="center" 
      justify="center" 
      style={[Layout.screenContent, isContainerScrollable() ? styles.scrollableContainer : {}]}
      scroll={isContainerScrollable()}
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
  },
  scrollableContainer: {
    paddingTop: Layout.space.base*4,
    paddingBottom: Layout.space.base*10,
    height: '100%',
  },
});

export default SignupScreen;
