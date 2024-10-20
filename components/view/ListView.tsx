import { StyleSheet, View, FlatList } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from './TextView';
import { Layout } from '@/constants/Layout';
import ApiClient from '@/classes/ApiClient';

export default ({style, children}: BaseProps) => {
  const data = ApiClient.get('jammers');

  return (
    <FlatList 
      data={data} 
      horizontal={false}  
      style={styles.list}
      renderItem={({item, index}) => {
        return (
          <View style={styles.item}>
            <TextView>{item.name}</TextView>
          </View>
        );
      }} 
    />
  );
};

const styles = StyleSheet.create({
  container: {
  },
  list: {
    width: '100%',
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.space.base,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.space.base,
    padding: Layout.space.base,
  },
});
