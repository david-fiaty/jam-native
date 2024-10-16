import { StyleSheet } from 'react-native';
import HeaderBar from '@/components/navigation/HeaderBar';
import LegalScreen from '@/components/screens/LegalScreen';
import ViewportContainer from '@/components/base/ViewportContainer';

const Legal = () => {
  return (
    <ViewportContainer>
      <HeaderBar />
      <LegalScreen />
    </ViewportContainer>
  );
};

export default Legal;