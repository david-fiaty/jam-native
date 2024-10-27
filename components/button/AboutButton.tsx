import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ButtonBase from '../base/ButtonBase';
import i18n from '@/translation/i18n';

const AboutButton = () => {
  const router = useRouter();

  return (
    <ButtonBase
      title={i18n.t('About')} 
      onPress={() => router.push('/about')} 
      //containerStyle={styles.container}
      //labelStyle={styles.label}
    />
  );
};

const styles = StyleSheet.create({
  container: {
  },
  label: {},
});

export default AboutButton;