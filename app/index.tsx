import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import Carousel from '../components/carousel/Controller';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { SvgImage } from '@/components/SvgImage';

const Index = () => {
  const router = useRouter();

  return (  
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.logo}>
        <SvgImage uri={require('@/assets/images/jam-logo.png')} />    
      </View>
      <View style={styles.carousel}>
        <Carousel />
      </View>
      <View style={styles.loginContainer}>
        <Button 
          title="Login / Signup" 
          type="outline" 
          buttonStyle={styles.loginButton} 
          titleStyle={[GlobalStyles.text, {textTransform: 'uppercase', fontSize: 13}]}
          onPress={() => router.push('/authentication')} 
        />
      </View>
      <Button 
        title="Skip" 
        type="clear" 
        titleStyle={GlobalStyles.text} 
        onPress={() => router.push('/jam')} 
      />
      <View style={styles.buttonGroup}>
        <Button 
          title="About" 
          type="clear" 
          onPress={() => router.push('/about')} 
          titleStyle={GlobalStyles.text}
        />
        <Button 
          title="Legal" 
          type="clear" 
          onPress={() => router.push('/legal')} 
          titleStyle={GlobalStyles.text}
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

export default Index;
