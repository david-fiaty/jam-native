import { StyleSheet, FlatList } from 'react-native';
import JamItem from '@/components/jam/JamItem';
import ApiClient from '@/classes/ApiClient';

const JamsScreen = () => {
  const data = ApiClient.get('jams');

  return (
    <FlatList 
      data={data} 
      horizontal={false}  
      renderItem={({item, index}) => <JamItem item={item} index={index} />} 
    />
  );
};

const styles = StyleSheet.create({

});

export default JamsScreen;