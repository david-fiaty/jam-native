import { Text } from 'react-native';
import HeaderBar from '@/components/navigation/HeaderBar';
import ViewportContainer from '@/components/base/ViewportContainer';

const Language = () => {
  return (
    <ViewportContainer>
      <HeaderBar />
      <Text>LANGUAGE</Text>
    </ViewportContainer>
  );
};

export default Language;