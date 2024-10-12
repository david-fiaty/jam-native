import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import { GlobalStyles } from '@/constants/GlobalStyles';
import Slideshow from '@/components/Slideshow';
import { StaticImage } from '@/components/images/StaticImage';
import BottomLinks from '@/components/navigation/BottomLinks';

const WelcomeScreen = () => {
  const router = useRouter();

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
        titleStyle={GlobalStyles.text} 
        onPress={() => router.push('/jams')} 
      />
      <BottomLinks />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  button: {
    marginTop: 40,
    borderRadius: 30,
    overflow: 'hidden',
    minWidth: '35%',
    maxWidth: '40%',
    alignSelf: 'center',
  },
});

export default WelcomeScreen;