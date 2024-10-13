import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WelcomeScreen from '@/components/screens/WelcomeScreen';

const Index = () => {
  return (  
    <SafeAreaView style={styles.container}>
      <WelcomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Index;