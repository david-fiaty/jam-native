import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ButtonBase from '../base/ButtonBase';

const AboutButton = () => {
  const router = useRouter();

  return (
    <ButtonBase
      title="About" 
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