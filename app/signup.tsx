import { StyleSheet } from 'react-native';
import SignupScreen from '@/components/screens/SignupScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Signup = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SignupScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default Signup;
