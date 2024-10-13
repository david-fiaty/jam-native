import { StyleSheet, View } from 'react-native';
import LoginForm from '@/components/forms/LoginForm';
import TextBlock from '@/components/base/TextBlock';
import JamLogo from '../images/JamLogo';
import ScreenView from '@/components/base/ScreenView';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <ScreenView>
        <JamLogo width={110} height={110} />  
        <TextBlock style={styles.text}>Welcome back</TextBlock>
        <LoginForm />
      </ScreenView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    textTransform: 'uppercase',
  }
});

export default LoginScreen;
