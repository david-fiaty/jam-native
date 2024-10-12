import { StyleSheet, View } from 'react-native';
import LegalScreen from '@/components/screens/LegalScreen';
import CenteredScreenView from '@/components/base/CenteredScreenView';

const Legal = () => {
  return (
    <View style={styles.container}>
      <CenteredScreenView>
        <LegalScreen />
      </CenteredScreenView>
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