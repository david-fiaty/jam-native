import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import SkipButton from '../button/SkipButton';
import ButtonBase from '../base/ButtonBase';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';

const LoginSignupButton = () => {
  const router = useRouter();

  return (
    <BoxView direction="row" align="center" justify="space-between">
      <ButtonBase
        title={i18n.t('Login / Signup')} 
        titleStyle={styles.titleStyle}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.containerStyle}
        onPress={() => router.push('/login')} 
      />
      <SkipButton onPress={() => router.push('/')} />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1, 
    borderColor: Colors.primary,
    borderRadius: 30,
    backgroundColor: 'black',
  },
  buttonStyle: {
    //textTransform: 'uppercase'
  },
  titleStyle: {
    textTransform: 'uppercase'
  },
});

export default LoginSignupButton;