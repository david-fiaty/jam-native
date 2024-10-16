import { Text } from 'react-native';
import HeaderBar from '@/components/navigation/HeaderBar';
import ViewportContainer from '@/components/base/ViewportContainer';

const Username = () => {
  return (
    <ViewportContainer>
      <HeaderBar />
      <Text>USERNAME</Text>
    </ViewportContainer>
  );
};

export default Username;