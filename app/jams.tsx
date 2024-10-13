import { StyleSheet, View } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import TopToolbar from '@/components/navigation/TopToolbar';
import BottomTabs from '@/components/navigation/BottomTabs';
import JamsScreen from '@/components/screens/JamsScreen';

const Jams = () => {
  return (  
    <>
      <View style={styles.container}>
        { /*<TopToolbar />*/ }
        <JamsScreen />
      </View>
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
