import { StyleSheet, View, Text } from 'react-native';
import { ScreenStyles } from '@/constants/ScreenStyles';
import { SvgImage } from '@/components/SvgImage';

const AuthenticationScreen = () => {
  return (
    <View style={ScreenStyles.container}>
      <View style={ScreenStyles.logo}>
        <SvgImage uri={require('@/assets/images/jam-logo.png')} />    
      </View>
      <Text>Authentication Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default AuthenticationScreen;
