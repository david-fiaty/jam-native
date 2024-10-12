import { StyleSheet, View } from 'react-native';
import SignupScreen from '@/components/screens/SignupScreen';

const Signup = () => {
  return (
    <View style={styles.container}>
      <SignupScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default Signup;
