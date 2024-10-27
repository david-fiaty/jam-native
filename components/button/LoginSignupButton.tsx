import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import SkipButton from '../button/SkipButton';
import ButtonBase from '../base/ButtonBase';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';

const LoginSignupButton = () => {
  const router = useRouter();

  return (
    <BoxView direction="column" align="center" justify="space-between">
      <ButtonBase
        title={i18n.t('Login') + ' / ' + i18n.t('Signup')} 
        titleStyle={styles.titleStyle}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.containerStyle}
        onPress={() => router.push('/login')} 
      />
      <SkipButton onPress={() => router.push('/main')} />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1, 
    borderColor: Colors.primary,
    borderRadius: 30,
  },
  buttonStyle: {
    backgroundColor: Colors.white,
  },
  titleStyle: {
    textTransform: 'uppercase',
    color: Colors.primary,
  },
});

export default LoginSignupButton;