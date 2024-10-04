import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import JamList from '@/components/jams/JamList';
import TopNavigation from '@/components/navigation/TopNavigation';

const Jams = () => {
  return (  
    <View style={styles.container}>
      <TopNavigation />
      <JamList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column', 
    marginTop: 30,
    padding: 25,
    height: '100%',
  },
  text: {
    color: GlobalStyles.text.color,
  },
});

export default Jams;
