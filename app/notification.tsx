import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ScreenView from '@/components/view/ScreenView';

const Notification = () => {
  const item = useLocalSearchParams();

  return (
    <ScreenView>
      <Text>{item.label}</Text>
      <Text>{item.content}</Text>
    </ScreenView>
  );
};

export default Notification;