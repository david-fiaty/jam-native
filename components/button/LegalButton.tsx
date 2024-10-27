import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ButtonBase from '../base/ButtonBase';
import i18n from '@/translation/i18n';

const LegalButton = () => {
  const router = useRouter();

  return (
    <ButtonBase
      title={i18n.t('Legal')} 
      titleStyle={styles.titleStyle}
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
      onPress={() => router.push('/legal')} 
    />
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


export default LegalButton;