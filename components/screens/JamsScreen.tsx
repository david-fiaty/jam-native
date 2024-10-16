import { View, FlatList } from 'react-native';
import JamItem from '@/components/jam/JamItem';
import ApiClient from '@/classes/ApiClient';
import { GlobalStyles } from '@/constants/GlobalStyles';

const JamsScreen = () => {
  const data = ApiClient.get('jams');

  return (
    <View style={styles.container}>
      <FlatList 
        data={data} 
        horizontal={false}  
        renderItem={({item, index}) => <JamItem item={item} index={index} />} 
      />
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: GlobalStyles.space,
  },
};

export default JamsScreen;