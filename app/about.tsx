import { StyleSheet, View} from 'react-native';
import AboutScreen from '@/components/screens/AboutScreen';

const About = () => {
  return (
    <View style={styles.container}>
      <AboutScreen />
    </View>
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