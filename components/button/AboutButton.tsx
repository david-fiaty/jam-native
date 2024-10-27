import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ButtonBase from '../base/ButtonBase';
import i18n from '@/translation/i18n';

const AboutButton = () => {
  const router = useRouter();

  return (
    <ButtonBase
      title={i18n.t('About')} 
      titleStyle={styles.titleStyle}
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
      onPress={() => router.push('/about')} 
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderColor: Colors.primary,
  },
  buttonStyle: {
    backgroundColor: Colors.white,
    padding: 0,
  },
  titleStyle: {
    color: Colors.primary,
  },
});

export default AboutButton;