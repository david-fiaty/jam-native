import { StyleSheet } from 'react-native';
import AboutScreen from '@/components/screens/AboutScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const About = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AboutScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column', 
    marginTop: 30,
    padding: 25,
  },
});

export default About;