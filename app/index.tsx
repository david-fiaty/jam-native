import { Text, Image, View, StyleSheet } from 'react-native';
import Carousel from '../components/Carousel';
import { Button } from '@rneui/themed';

export default function Home() {
  return (  
    <View style={styles.container}>
      <Image source={require('@/assets/images/jam-logo.png')} style={styles.logo} />    
      <Carousel />
      <Button title="Login/Signup" type="outline" />
      <Button title="Skip" type="clear" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", 
    alignContent: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    alignSelf: "center",
    marginTop: 100,
  },
});
