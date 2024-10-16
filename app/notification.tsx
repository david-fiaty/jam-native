import { StyleSheet, Text } from 'react-native';
import HeaderBar from '@/components/navigation/HeaderBar';
import ViewportContainer from '@/components/base/ViewportContainer';

const Notification = () => {
  return (
    <ViewportContainer>
      <HeaderBar />
      <Text>NOTIFICATION</Text>
    </ViewportContainer>
  );
};

export default Notification;