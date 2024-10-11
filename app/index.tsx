import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/GlobalStyles';
import WelcomeScreen from '@/components/screens/WelcomeScreen';
//import { Collapsible } from '@/components/Collapsible';
//import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const Index = () => {
  return (  
    <View style={styles.container}>



  <Accordion
    activeSections={[0]}
    sections={['Section 1', 'Section 2', 'Section 3']}
    renderSectionTitle={<Text>Section title</Text>}
    renderHeader={<Text>Section title</Text>}
    renderContent={<Text>Section title</Text>}
  />


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
