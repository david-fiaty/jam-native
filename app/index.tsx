import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import Carousel from '../components/carousel/Controller';
import { SvgImage } from '@/components/SvgImage';
import { ScreenStyles } from '@/constants/ScreenStyles';

const HomeScreen = () => {
  const router = useRouter();

  return (  
    <View style={ScreenStyles.container}>
      <View style={styles.logo}>
        <SvgImage uri={require('@/assets/images/jam-logo.png')} />    
      </View>
      <View style={styles.carousel}>
        <Carousel />
      </View>
      <View style={styles.loginContainer}>
        <Button title="Login/Signup" type="outline" buttonStyle={styles.loginButton} onPress={() => router.push('/authentication')} />
      </View>
      <Button title="Skip" type="clear" />
      <View style={styles.buttonGroup}>
        <Button title="About" type="clear" onPress={() => router.push('/about')} />
        <Button title="Legal" type="clear" onPress={() => router.push('/legal')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: -100,
  },
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
