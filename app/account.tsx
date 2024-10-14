import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopToolbar from '@/components/navigation/TopToolbar';
import BackButton from '@/components/navigation/BackButton';

const Account = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <TopToolbar />
      <BackButton title="Account information" onPress={() => navigation.popToTop()}/>
      <Text>ACCOUNT</Text>
    </SafeAreaView>
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

export default Account;