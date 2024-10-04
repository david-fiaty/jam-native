import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import Carousel from '../components/carousel/Controller';
import { ScreenStyles } from '@/constants/ScreenStyles';
import { SvgImage } from '@/components/SvgImage';

const HomeScreen = () => {
  const router = useRouter();

  return (  
    <View style={ScreenStyles.container}>
      <View style={ScreenStyles.logo}>
        <SvgImage uri={require('@/assets/images/jam-logo.png')} />    
      </View>
      <View style={styles.carousel}>
        <Carousel />
      </View>
      <View style={styles.loginContainer}>
        <Button 
          title="Login/Signup" 
          type="outline" 
          buttonStyle={styles.loginButton} 
          titleStyle={ScreenStyles.text}
          onPress={() => router.push('/authentication')} 
        />
      </View>
      <View>
        <Button title="Skip" type="clear" titleStyle={ScreenStyles.text} />
      </View>
      <View style={styles.buttonGroup}>
        <Button 
          title="About" 
          type="clear" 
          onPress={() => router.push('/about')} 
          titleStyle={ScreenStyles.text}
        />
        <Button 
          title="Legal" 
          type="clear" 
          onPress={() => router.push('/legal')} 
          titleStyle={ScreenStyles.text}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    justifyContent: "center",
    alignItems: 'center',
  },
  loginContainer: {
    marginTop: 40,
  },
  loginButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
