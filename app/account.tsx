import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopToolbar from '@/components/navigation/TopToolbar';
import BackButton from '@/components/navigation/BackButton';

const Account = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <TopToolbar />
      <BackButton title="Account information" onPress={() => router.replace('/jams')}/>
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