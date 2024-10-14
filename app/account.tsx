import { StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopToolbar from '@/components/navigation/TopToolbar';
import BackButton from '@/components/navigation/BackButton';
import ProfileScreen from '@/components/screens/ProfileScreen';

const Account = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <TopToolbar />
      <BackButton title="Account information" onPress={() => router.replace('/jams')}/>
      <ProfileScreen />
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