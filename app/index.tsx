import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/GlobalStyles';
import WelcomeScreen from '@/components/screens/WelcomeScreen';

const Index = () => {
  return (  
    <View style={styles.container}>
      <WelcomeScreen />
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
    backgroundColor: Colors.background,
    height: '100%',
  },
});

export default Index;
