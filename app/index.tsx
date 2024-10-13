import { View, StyleSheet } from 'react-native';
import WelcomeScreen from '@/components/screens/WelcomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

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