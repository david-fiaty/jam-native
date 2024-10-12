import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import TextBlock from '../base/TextBlock';

const LoginForm = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>    
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor={GlobalStyles.text.color}
      />
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
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1, 
    borderColor: Colors.primary, 
    borderRadius: 6,
    paddingHorizontal: 12, 
    marginBottom: 10,
  },
});

export default LoginForm;