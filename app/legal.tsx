import { StyleSheet, View } from 'react-native';
import LegalScreen from '@/components/screens/LegalScreen';

const Legal = () => {
  return (
    <View style={styles.container}>
      <LegalScreen />
    </View>
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