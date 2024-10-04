import { StyleSheet, View, Text} from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TopNavigation from '@/components/navigation/TopNavigation';
import BackButton from '@/components/navigation/BackButton';

const About = () => {
  return (
    <View style={styles.container}>
      <TopNavigation />
      <BackButton />
      <Text style={{color: GlobalStyles.text.color}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
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