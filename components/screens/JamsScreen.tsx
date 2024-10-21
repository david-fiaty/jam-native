import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import ApiClient from '@/classes/ApiClient';
import { GlobalStyles } from '@/constants/GlobalStyles';
import JamHeader from '@/components/jam/JamHeader';
import JamImages from '@/components/jam/JamImages';
import JamToolbar from '@/components/jam/JamToolbar';
import JamContent from '@/components/jam/JamContent';
import TextBlock from '../base/TextBlock';

type ItemProps = {
  item: object,
  index: number,
};

const Item = ({item, index}: ItemProps) => {
  return (
    <View style={styles.item}>
      <JamHeader item={item} index={index} />
      <JamImages item={item} index={index} />
      <JamToolbar item={item} index={index} />
      <JamContent item={item} index={index} />
    </View>
  );
};

const JamsScreen = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      setData(await ApiClient.get('jams', true));
    })();
  }, []);

  if (!data) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={data} 
        horizontal={false}  
        renderItem={({item, index}) => <Item item={item} index={index} />} 
      />
    </View>
  );
};

const styles = {
  container: {
  },
  item: {
    borderWidth: 1,
    marginBottom: GlobalStyles.space.container,
    paddingBottom: GlobalStyles.space.base,
    borderRadius: GlobalStyles.space.base,
    borderColor: GlobalStyles.border.color,
  },
};

export default JamsScreen;