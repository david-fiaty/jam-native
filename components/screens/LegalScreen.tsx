import { StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '@/components/navigation/BackButton';
import BottomLinks from '@/components/navigation/BottomLinks';
import TextBlock from '@/components/base/TextBlock';

const data = {
  title: 'Legal',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};


const LegalScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackButton title={data.title} onPress={() => navigation.popToTop()}/>
      <TextBlock>{data.text}</TextBlock>
      <BottomLinks />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default LegalScreen;