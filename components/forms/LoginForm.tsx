import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import TextBlock from '../base/TextBlock';
import TextField from '../fields/TextField';

const LoginForm = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>    
      <TextField placeholder="Enter your email address" style={styles.field} />
      <View style={styles.buttonContainer}>
        <Button 
          title="Continue" 
          type="solid" 
          buttonStyle={styles.button} 
          onPress={() => router.push('/login')} 
        />
        <View style={styles.signup}>
          <TextBlock>Don't have an account? Sign Up</TextBlock>
          <Pressable onPress={() => router.push('/jams')}>
            <TextBlock>skip</TextBlock>
          </Pressable>
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
  },
  buttonContainer: {
    width: '100%',
  },
  signup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
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