import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopToolbar from '@/components/navigation/TopToolbar';

const Username = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopToolbar />
      <Text>USERNAME</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column', 
  },
});

export default Username;