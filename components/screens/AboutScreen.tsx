import { StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopToolbar from '@/components/navigation/TopToolbar';
import BackButton from '@/components/navigation/BackButton';
import BottomLinks from '@/components/navigation/BottomLinks';
import AboutScreenContent from '@/constants/AboutScreenContent';
import TextBlock from '@/components/base/TextBlock';

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopToolbar />
      <BackButton title={AboutScreenContent.title} onPress={() => navigation.popToTop()}/>
      <TextBlock>{AboutScreenContent.text}</TextBlock>
      <BottomLinks />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default AboutScreen;