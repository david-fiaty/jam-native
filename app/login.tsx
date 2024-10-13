import { StyleSheet } from 'react-native';
import LoginScreen from '@/components/screens/LoginScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LoginScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default Login;
