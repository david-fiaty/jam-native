import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/GlobalStyles';
import WelcomeScreen from '@/components/screens/WelcomeScreen';
import AccordionView from '@/components/AccordionView';

const Index = () => {
  return (  
    <View style={styles.container}>



  <AccordionView />


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
