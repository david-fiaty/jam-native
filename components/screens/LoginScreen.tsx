import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/GlobalStyles';
import { StaticImage } from '@/components/images/StaticImage';
import LoginForm from '@/components/forms/LoginForm';
import TextBlock from '../base/TextBlock';

const LoginScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StaticImage uri={require('@/assets/images/jam-logo.png')} width={110} height={110} />  
      <TextBlock>Welcome back</TextBlock>
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    alignContent: 'center',
    backgroundColor: Colors.background,
    height: '100%',
  },
  title: {
    textTransform: 'uppercase',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;