import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopToolbar from '@/components/navigation/TopToolbar';
import LegalScreen from '@/components/screens/LegalScreen';

const Legal = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopToolbar />
      <LegalScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column', 
  },
});

export default Legal;