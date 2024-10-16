import { StyleSheet } from 'react-native';
import TopToolbar from '@/components/navigation/TopToolbar';
import LegalScreen from '@/components/screens/LegalScreen';
import ViewportContainer from '@/components/base/ViewportContainer';

const Legal = () => {
  return (
    <ViewportContainer>
      <TopToolbar />
      <LegalScreen />
    </ViewportContainer>
  );
};

export default Legal;