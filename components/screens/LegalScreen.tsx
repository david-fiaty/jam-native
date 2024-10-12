import { StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopToolbar from '@/components/navigation/TopToolbar';
import BackButton from '@/components/navigation/BackButton';
import BottomLinks from '@/components/navigation/BottomLinks';
import LegalScreenContent from '@/constants/LegalScreenContent';
import TextBlock from '@/components/base/TextBlock';

const LegalScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopToolbar />
      <BackButton title={LegalScreenContent.title} onPress={() => navigation.popToTop()}/>
      <TextBlock>{LegalScreenContent.text}</TextBlock>
      <BottomLinks />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default LegalScreen;