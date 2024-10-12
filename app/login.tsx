import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import LoginScreen from '@/components/screens/LoginScreen';

const Login = () => {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default Login;
