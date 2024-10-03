import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import Carousel from '../components/carousel/Controller';
import { SvgImage } from '@/components/SvgImage';


export default function Home() {
  const router = useRouter();

  return (  
    <View style={styles.container}>
      <View style={styles.logo}>
        <SvgImage uri={require('@/assets/images/jam-logo.png')} />    
      </View>
      <View style={styles.carousel}>
        <Carousel />
      </View>

      <View style={styles.loginContainer}>
        <Button title="Login/Signup" type="outline" buttonStyle={styles.loginButton} onPress={() => router.push('/authentication')}/>
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
