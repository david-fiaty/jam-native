import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import SignupForm from '../form/SignupForm';

const SignupScreen = () => {
  return (
    <BoxView direction="column" align="center" justify="center" style={Layout.screenContent}>
      <LogoView size={80} />    
      <TextView style={styles.slogan}>{i18n.t('Create a JAM account')}</TextView> 
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
