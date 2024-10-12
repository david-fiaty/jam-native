import { View, StyleSheet } from 'react-native';
import AboutButton from '../buttons/AboutButton';
import LegalButton from '../buttons/LegalButton';
import { GlobalStyles } from '@/constants/GlobalStyles';

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
    marginTop: GlobalStyles.gap,
  },
});

export default BottomLinks;