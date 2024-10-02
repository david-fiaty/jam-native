import { Image, View, StyleSheet } from 'react-native';
import Carousel from '../components/carousel/Controller';
import { Button } from '@rneui/themed';
import { SvgImage } from '@/components/SvgImage';

export default function Home() {
  return (  
    <View style={styles.container}>
      <View style={styles.logo}>
        <SvgImage uri={require('@/assets/images/jam-logo.png')} />    
      </View>
      <View style={styles.carousel}>
        <Carousel />
      </View>
      <View style={styles.loginContainer}>
        <Button title="Login/Signup" type="outline" style={styles.loginButton} />
      </View>
      <Button title="Skip" type="clear" />
      <View style={styles.buttonGroup}>
        <Button title="About" type="clear" />
        <Button title="Legal" type="clear" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
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
    borderRadius: 10,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
