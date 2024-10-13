import { StyleSheet } from 'react-native';
import LegalScreen from '@/components/screens/LegalScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Legal = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LegalScreen />
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

export default Legal;