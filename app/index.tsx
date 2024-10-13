import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WelcomeScreen from '@/components/screens/WelcomeScreen';
import PrimaryIcon from '@/components/icons/PrimaryIcon';

const Index = () => {
  return (  
    <SafeAreaView style={styles.container}>
      <PrimaryIcon name="user" />
      <WelcomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Index;