import { StyleSheet, View, Text} from 'react-native';
import { Button } from '@rneui/themed';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '@/constants/GlobalStyles';

const About = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <AntDesign name="left" size={20} color={GlobalStyles.text.color} style={{marginTop: 8}} />
        <Button 
          title="About" 
          type="clear" 
          onPress={() => navigation.goBack()}
          titleStyle={GlobalStyles.text}
        />
      </View>
      <Text style={{color: GlobalStyles.text.color}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  container: {
    display: 'flex',
    flexDirection: 'column', 
    marginTop: 30,
    padding: 25,
  },
});

export default About;