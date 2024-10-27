import { StyleSheet, View } from 'react-native';
import LogoView from '../view/LogoView';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import { Layout } from '@/constants/Layout';

const LoginScreen = () => {
  return (
    <BoxView direction="column" align="center" justify="center" style={styles.container}>
      <LogoView size={{ width: 80, height: 80 }} />    
      <TextView style={styles.message}>{i18n.t('Welcome back')}</TextView> 
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {},
  message: {
    textTransform: 'uppercase',
    fontSize: Layout.fontSize.base*1.2,
  }
});

export default LoginScreen;
