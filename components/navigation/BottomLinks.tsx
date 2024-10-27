import { View, StyleSheet } from 'react-native';
import AboutButton from '../button/AboutButton';
import LegalButton from '../button/LegalButton';
import BoxView from '../view/BoxView';

const BottomLinks = () => {
  return (
    <BoxView direction="row" align="center" justify="space-between">
      <AboutButton />
      <LegalButton />
    </BoxView>
  );
};

export default BottomLinks;