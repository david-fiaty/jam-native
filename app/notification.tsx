import { StyleSheet, Text } from 'react-native';
import TopToolbar from '@/components/navigation/TopToolbar';
import ViewportContainer from '@/components/base/ViewportContainer';

const Notification = () => {
  return (
    <ViewportContainer>
      <TopToolbar />
      <Text>NOTIFICATION</Text>
    </ViewportContainer>
  );
};

export default Notification;