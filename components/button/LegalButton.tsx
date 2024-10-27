import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ButtonBase from '../base/ButtonBase';
import i18n from '@/translation/i18n';

const LegalButton = () => {
  const router = useRouter();

  return (
    <ButtonBase
      title={i18n.t('Legal')} 
      onPress={() => router.push('/legal')} 
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

export default LegalButton;