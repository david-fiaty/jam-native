import { StyleSheet, View } from 'react-native';
import LoginForm from '@/components/forms/LoginForm';
import TextBlock from '@/components/base/TextBlock';
import JamLogo from '../images/JamLogo';
import FullScreenView from '@/components/base/FullScreenView';

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <FullScreenView>
        <JamLogo width={110} height={110} />  
        <TextBlock>Welcome back</TextBlock>
        <LoginForm />
      </FullScreenView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SignupScreen;
