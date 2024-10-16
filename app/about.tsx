import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopToolbar from '@/components/navigation/TopToolbar';
import AboutScreen from '@/components/screens/AboutScreen';

const About = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopToolbar />
      <AboutScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column', 
  },
});

export default About;