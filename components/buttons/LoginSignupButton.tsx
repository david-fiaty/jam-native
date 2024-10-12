import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StaticButton } from '../base/StaticButton';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

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
    borderWidth: 1, 
    borderColor: Colors.primary,
    borderRadius: 30,
    marginTop: GlobalStyles.space*2,
  },
  label: {
    textTransform: 'uppercase'
  },
});

export default LoginSignupButton;