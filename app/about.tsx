import { StyleSheet, View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TopToolbar from '@/components/navigation/TopToolbar';
import BackButton from '@/components/navigation/BackButton';
import BottomLinks from '@/components/navigation/BottomLinks';
import AboutScreenContent from '@/data/AboutScreenContent';

const About = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopToolbar />
      <BackButton title={AboutScreenContent.title} onPress={() => navigation.popToTop()}/>
      <Text style={styles.text}>
        {AboutScreenContent.text}
      </Text>
      <BottomLinks />
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
  text: {
    color: GlobalStyles.text.color,
  },
});

export default About;