import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StaticButton } from '../base/StaticButton';

const AboutButton = () => {
  const router = useRouter();

  return (
    <StaticButton
      label="About" 
      onPress={() => router.push('/about')} 
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

export default AboutButton;