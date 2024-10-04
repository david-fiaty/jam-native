import { StyleSheet, View, FlatList, Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TopNavigation from '@/components/navigation/TopNavigation';
import JamItem from '@/components/jam/JamItem';

const Jams = () => {
  return (  
    <View style={styles.container}>
      <TopNavigation />
      <FlatList 
        data={data} 
        horizontal={false}  
        renderItem={({item, index}) => <JamItem item={item} index={index} />} 
      />
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
