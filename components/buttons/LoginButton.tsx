import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import { GlobalStyles } from '@/constants/GlobalStyles';

const LoginButton = () => {
  const router = useRouter();

  return (
    <Button 
      title="Login / Signup" 
      type="outline" 
      buttonStyle={styles.button} 
      titleStyle={[GlobalStyles.text, {textTransform: 'uppercase', fontSize: 13}]}
      onPress={() => router.push('/login')} 
    />
  );
};

const styles = StyleSheet.create({
  text: GlobalStyles.text,
  button: {
    marginTop: 40,
    borderRadius: 30,
    overflow: 'hidden',
  },
});

export default LoginButton;