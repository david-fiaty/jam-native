import { StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';
import StaticButton from '../base/StaticButton';

const AboutButton = () => {
  const router = useRouter();

  return (
    <Link href="/modal">
      <StaticButton
        label="About" 
        //onPress={() => router.push('/test')} 
        containerStyle={styles.container}
        labelStyle={styles.label}
      />
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  label: {},
});

export default AboutButton;