import { Text } from 'react-native';
import TopToolbar from '@/components/navigation/TopToolbar';
import ViewportContainer from '@/components/base/ViewportContainer';

const Username = () => {
  return (
    <ViewportContainer>
      <TopToolbar />
      <Text>USERNAME</Text>
    </ViewportContainer>
  );
};

export default Username;