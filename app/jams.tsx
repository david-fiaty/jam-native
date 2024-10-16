import { StyleSheet } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import TopToolbar from '@/components/navigation/TopToolbar';
import BottomTabs from '@/components/navigation/BottomTabs';
import JamsScreen from '@/components/screens/JamsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Jams = () => {
  return (  
    <SafeAreaView style={styles.container}>
      <TopToolbar /> 
      <JamsScreen />
      <BottomTabs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  text: {
    color: GlobalStyles.text.color,
  },
});

export default Jams;
