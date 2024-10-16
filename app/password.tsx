import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopToolbar from '@/components/navigation/TopToolbar';
import ViewportContainer from '@/components/base/ViewportContainer';

const Password = () => {
  return (
    <ViewportContainer>
      <TopToolbar />
      <Text>PASSWORD</Text>
    </ViewportContainer>
  );
};

export default Password;