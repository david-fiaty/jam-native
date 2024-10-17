import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import StaticButton from '../base/StaticButton';
import SkipButton from '../buttons/SkipButton';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

const LoginSignupButton = () => {
  const router = useRouter();

  return (
    <View style={{gap: GlobalStyles.space.base}}>
      <StaticButton
        label="Login / Signup" 
        onPress={() => router.push('/login')} 
        containerStyle={styles.container}
        labelStyle={styles.label}
      />
      <SkipButton onPress={() => router.push('/jams')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1, 
    borderColor: Colors.primary,
    borderRadius: 30,
  },
  label: {
    textTransform: 'uppercase'
  },
});

export default LoginSignupButton;