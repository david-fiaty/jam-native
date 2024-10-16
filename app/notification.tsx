import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopToolbar from '@/components/navigation/TopToolbar';

const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopToolbar />
      <Text>NOTIFICATION</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column', 
  },
});

export default Notification;