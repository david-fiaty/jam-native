import { StyleSheet, View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TopToolbar from '@/components/navigation/TopToolbar';
import BackButton from '@/components/navigation/BackButton';
import BottomLinks from '@/components/navigation/BottomLinks';
import LegalScreenContent from '@/constants/LegalScreenContent';

const Legal = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopToolbar />
      <BackButton title={LegalScreenContent.title} onPress={() => navigation.popToTop()}/>
      <Text style={styles.text}>
        {LegalScreenContent.text}
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

export default Legal;