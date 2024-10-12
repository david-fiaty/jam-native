import { StyleSheet, View } from 'react-native';
import LoginForm from '@/components/forms/LoginForm';
import TextBlock from '@/components/base/TextBlock';
import JamLogo from '../images/JamLogo';
import CenteredScreenView from '@/components/base/CenteredScreenView';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <CenteredScreenView>
        <JamLogo width={110} height={110} />  
        <TextBlock>Welcome back</TextBlock>
        <LoginForm />
      </CenteredScreenView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LoginScreen;
