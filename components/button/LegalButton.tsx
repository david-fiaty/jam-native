import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ButtonBase from '../base/ButtonBase';

const LegalButton = () => {
  const router = useRouter();

  return (
    <ButtonBase
      label="Legal" 
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