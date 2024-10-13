import { StyleSheet } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import TopToolbar from '@/components/navigation/TopToolbar';
import BottomTabs from '@/components/navigation/BottomTabs';
import JamsScreen from '@/components/screens/JamsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Jams = () => {
  return (  
    <>
      <TopToolbar /> 
      <SafeAreaView style={styles.container}>
        <JamsScreen />
      </SafeAreaView>
      <BottomTabs />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column', 
    marginTop: 30,
    padding: 20,
    height: '100%',
    backgroundColor: Colors.background,
  },
  text: {
    color: GlobalStyles.text.color,
  },
});

export default Jams;
