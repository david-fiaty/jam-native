import { View, StyleSheet } from 'react-native';
import AboutButton from '../button/AboutButton';
import LegalButton from '../button/LegalButton';

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
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomLinks;