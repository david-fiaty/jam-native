import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const LoginForm = () => {
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
  button: {
    height: 45,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default LoginForm;