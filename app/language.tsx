import { Text } from 'react-native';
import TopToolbar from '@/components/navigation/TopToolbar';
import ViewportContainer from '@/components/base/ViewportContainer';

const Language = () => {
  return (
    <ViewportContainer>
      <TopToolbar />
      <Text>LANGUAGE</Text>
    </ViewportContainer>
  );
};

export default Language;