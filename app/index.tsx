import { Text, Image, View, StyleSheet } from 'react-native';
import WelcomeCarousel from '../components/WelcomeCarousel';
import { Button } from '@rneui/themed';

export default function WelcomeScreen() {
  return (  
    <View style={styles.container}>
      <Image source={require('@/assets/images/jam-logo.png')} style={styles.logo} />    
      <Text style={styles.slogan}>Create better, together</Text> 
      <WelcomeCarousel />
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
  slogan: {
    color: "#0a00aa",
    textTransform: "uppercase",
  },
});
