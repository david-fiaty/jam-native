import { StyleSheet, View, Text } from 'react-native';
import { Input } from '@rneui/themed';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { SvgImage } from '@/components/SvgImage';

const AuthenticationScreen = () => {
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.logo}>
        <SvgImage uri={require('@/assets/images/jam-logo.png')} />    
      </View>
      <Text style={[GlobalStyles.text, styles.title]}>Welcome back</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default AuthenticationScreen;
