import { View, StyleSheet } from 'react-native';
import AboutButton from '../buttons/AboutButton';
import LegalButton from '../buttons/LegalButton';

const BottomLinks = () => {
  return (
    <View style={styles.container}>
      <AboutButton />
      <LegalButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default BottomLinks;