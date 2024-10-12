import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/GlobalStyles';
import LoginForm from '@/components/forms/LoginForm';
import TextBlock from '../base/TextBlock';
import JamLogo from '../images/JamLogo';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <JamLogo width={110} height={110} />  
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