import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import JamList from '@/components/jams/JamList';

const Jams = () => {
  return (  
    <View style={styles.container}>
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
  },
  text: {
    color: GlobalStyles.text.color,
  },
});

export default Jams;
