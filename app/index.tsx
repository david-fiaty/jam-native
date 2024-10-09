import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import Slideshow from '../components/Slideshow';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { StaticImage } from '@/components/StaticImage';
import BottomLinks from '@/components/navigation/BottomLinks';

const Index = () => {
  const router = useRouter();

  console.log(process.env.API_URL);
  console.log(process.env.API_ENABLED);

  return (  
    <View style={styles.container}>
      <StaticImage uri={require('@/assets/images/jam-logo.png')} width={110} height={110} />    
      <Slideshow />
      <Button 
        title="Login / Signup" 
        type="outline" 
        buttonStyle={styles.button} 
        titleStyle={[GlobalStyles.text, {textTransform: 'uppercase', fontSize: 13}]}
        onPress={() => router.push('/login')} 
      />
      <Button 
        title="Skip" 
        type="clear" 
        titleStyle={styles.text} 
        onPress={() => router.push('/jams')} 
      />
      <BottomLinks />
    </View>
  );
};

const styles = StyleSheet.create({
  container: GlobalStyles.container,
  text: GlobalStyles.text,
  button: {
    marginTop: 40,
    borderRadius: 30,
    overflow: 'hidden',
  },
});

export default Index;
