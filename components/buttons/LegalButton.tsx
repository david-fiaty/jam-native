import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import StaticButton from '../base/StaticButton';

const LegalButton = () => {
  const router = useRouter();

  return (
    <StaticButton
      label="Legal" 
      onPress={() => router.push('/legal')} 
      containerStyle={styles.container}
      labelStyle={styles.label}
    />
  );
};

const styles = StyleSheet.create({
  container: {
  },
  label: {},
});

export default LegalButton;