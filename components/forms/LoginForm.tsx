import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';
import InputTextField from '../fields/InputTextField';
import ContinueButton from '../buttons/ContinueButton';
import SkipButton from '../buttons/SkipButton';

const LoginForm = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>    
      <InputTextField placeholder="Enter your email address" style={styles.field} />
      <View style={styles.buttonContainer}>
        <ContinueButton onPress={() => router.push('/login')} />
        <View style={styles.signup}>
          <TextBlock>Don't have an account? Sign Up</TextBlock>
          <SkipButton onPress={() => router.push('/jams')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    gap: GlobalStyles.space,
  },
  buttonContainer: {
    width: '100%',
  },
  signup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: GlobalStyles.space,
  },
  button: {
    height: 45,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  field: {
    backgroundColor: '#FFFFFF',
    height: 45,
    borderColor: Colors.primary, 
  },
});

export default LoginForm;