import { StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '@/components/navigation/BackButton';
import BottomLinks from '@/components/navigation/BottomLinks';
import TextBlock from '@/components/base/TextBlock';

const AccountScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackButton title="Account title" onPress={() => navigation.popToTop()}/>
      <TextBlock>Account content</TextBlock>
      <BottomLinks />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default AccountScreen;