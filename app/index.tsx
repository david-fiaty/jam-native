import { Image, View, StyleSheet } from 'react-native';
import Carousel from '../components/carousel/Controller';
import { Button } from '@rneui/themed';
import { SvgImage } from '@/components/SvgImage';

export default function Home() {
  return (  
    <View style={styles.container}>
      <View>
        <SvgImage uri={require('@/assets/images/jam-logo.png')} />    
      </View>
      <View style={styles.carousel}>
        <Carousel />
      </View>
      <Button title="Login/Signup" type="outline" />
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
  },
  carousel: {
    width: '80%',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
});
