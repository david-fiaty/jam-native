import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StaticButton } from '../base/StaticButton';

const LoginSignupButton = () => {
  const router = useRouter();

  return (
    <StaticButton
      label="Login / Signup" 
      onPress={() => router.push('/login')} 
      containerStyle={styles.container}
      labelStyle={styles.label}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3, 
    borderRadius: 8,
  },
  label: {
    textTransform: 'uppercase'
  },
});

export default LoginSignupButton;