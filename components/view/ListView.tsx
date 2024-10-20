import { StyleSheet, View, FlatList } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from './TextView';
import { Layout } from '@/constants/Layout';
import DeviceManager from '@/classes/DeviceManager';

type Props = BaseProps & {
  data: object,
  style?: object,
};

export default ({data, style}: Props) => {
  return (
    <View style={styles.container}>
      <FlatList 
        data={data} 
        horizontal={false}  
        contentContainerStyle={styles.list}
        renderItem={({item, index}) => {
          return (
            <View style={styles.item}>
              <TextView>{item.name}</TextView>
            </View>
          );
        }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DeviceManager.window.width,
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
    alignItems: 'flex-start',
    gap: Layout.space.base,
    padding: Layout.space.base,
    //width: '100%',
    backgroundColor: 'red',
  },
});
