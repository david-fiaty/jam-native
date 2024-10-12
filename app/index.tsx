import { View, StyleSheet, Text } from 'react-native';
import WelcomeScreen from '@/components/screens/WelcomeScreen';

const Index = () => {
  return (  
    <View style={styles.container}>
      <WelcomeScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Index;