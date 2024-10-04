import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { SvgImage } from '@/components/SvgImage';

const AuthenticationScreen = () => {
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.logo}>
        <SvgImage uri={require('@/assets/images/jam-logo.png')} />    
      </View>
      <Text>Authentication Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default AuthenticationScreen;
