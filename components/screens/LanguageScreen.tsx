import { StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '@/components/navigation/BackButton';
import BottomLinks from '@/components/navigation/BottomLinks';
import TextBlock from '@/components/base/TextBlock';

const LanguageScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackButton title="Language title" onPress={() => navigation.popToTop()}/>
      <TextBlock>Language content</TextBlock>
      <BottomLinks />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default LanguageScreen;