import { StyleSheet, View } from 'react-native';
import TopToolbar from '@/components/navigation/TopToolbar';
import BottomTabs from '@/components/navigation/BottomTabs';
import JamsScreen from '@/components/screens/JamsScreen';
import ViewportContainer from '@/components/base/ViewportContainer';

const Jams = () => {
  return (  
    <ViewportContainer style={styles.container}>
      <TopToolbar /> 
      <JamsScreen />
      <BottomTabs />
    </ViewportContainer>
  );
};

const styles = StyleSheet.create({

  /*
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    backgroundColor: 'blue',
  },
  */
});

export default Jams;
