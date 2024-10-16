import { FlatList } from 'react-native';
import JamItem from '@/components/jam/JamItem';
import ApiClient from '@/classes/ApiClient';
import { GlobalStyles } from '@/constants/GlobalStyles';

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

const styles = {
  paddingHorizontal: GlobalStyles.space,
};

export default JamsScreen;