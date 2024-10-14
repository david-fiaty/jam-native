import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopToolbar from '@/components/navigation/TopToolbar';

const Account = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopToolbar />
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