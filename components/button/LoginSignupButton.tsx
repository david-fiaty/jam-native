import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import SkipButton from '../button/SkipButton';
import ButtonBase from '../base/ButtonBase';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';

const LoginSignupButton = () => {
  const router = useRouter();

  return (
    <BoxView direction="row" align="center" justify="space-between">
      <ButtonBase
        label={i18n.t('Login / Signup')} 
        onPress={() => router.push('/login')} 
      />
      <SkipButton onPress={() => router.push('/')} />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1, 
    //borderColor: Colors.primary,
    borderRadius: 30,
  },
  label: {
    textTransform: 'uppercase'
  },
});

export default LoginSignupButton;