import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import AboutButton from '../button/AboutButton';
import LegalButton from '../button/LegalButton';
import BoxView from '../view/BoxView';

const BottomLinks = () => {
  return (
    <BoxView direction="row" align="center" justify="space-around" style={styles.container}>
      <AboutButton />
      <LegalButton />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    gap: Layout.space.base*2,
  },
});

export default BottomLinks;