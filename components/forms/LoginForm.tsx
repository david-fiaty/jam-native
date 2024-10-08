import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const LoginForm = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>    
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        style={GlobalStyles.input}
        placeholder="Enter your email address"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <View style={styles.continue}>
        <Button 
          title="Continue" 
          type="solid" 
          buttonStyle={styles.button} 
          onPress={() => router.push('/login')} 
        />
        <View style={styles.signup}>
          <Text style={[GlobalStyles.text, {fontWeight: 'normal'}]}>Don't have an account? Sign Up</Text>
          <Pressable onPress={() => router.push('/jams')}>
            <Text style={GlobalStyles.text}>skip</Text>
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
  continue: {
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
});

export default LoginForm;