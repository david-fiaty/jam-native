import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '@/components/navigation/HeaderBar';
import ViewportContainer from '@/components/base/ViewportContainer';

const Password = () => {
  return (
    <ViewportContainer>
      <HeaderBar />
      <Text>PASSWORD</Text>
    </ViewportContainer>
  );
};

export default Password;