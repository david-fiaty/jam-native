import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { StaticImage } from '@/components/images/StaticImage';
import LoginForm from '@/components/forms/LoginForm';

const Login = () => {
  return (
    <View style={GlobalStyles.container}>
      <StaticImage uri={require('@/assets/images/jam-logo.png')} width={110} height={110} />  
      <Text style={[GlobalStyles.text, styles.title]}>Welcome back</Text>
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Login;
