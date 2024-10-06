import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { StaticImage } from '@/components/StaticImage';

const Login = () => {
  return (
    <View style={GlobalStyles.container}>
      <StaticImage uri={require('@/assets/images/jam-logo.png')} width={110} height={110} />  
      <Text style={[GlobalStyles.text, styles.title]}>Welcome back</Text>
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
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  continue: {
    width: '80%',
    height: 45,
  },
});

export default Login;
