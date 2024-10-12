import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import { GlobalStyles } from '@/constants/GlobalStyles';
import Slideshow from '@/components/Slideshow';
import BottomLinks from '@/components/navigation/BottomLinks';
import JamLogo from '../images/JamLogo';
import { StaticButton } from '../base/StaticButton';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <JamLogo width={110} height={110} />    
      <Slideshow />
      <StaticButton
        label="Login / Signup" 
        onPress={() => router.push('/login')} 
        containerStyle={{borderWidth: 3, borderRadius: 8}}
        labelStyle={{textTransform: 'uppercase'}}
      />
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