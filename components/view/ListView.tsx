import { StyleSheet, View, FlatList, Touchable, TouchableOpacity } from 'react-native';
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
    <FlatList 
      data={data} 
      horizontal={false}  
      contentContainerStyle={styles.list}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity>
            <View style={styles.item}>
              <TextView>{item.name}</TextView>
            </View>
          </TouchableOpacity>
        );
      }} 
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: DeviceManager.window.width,
    backgroundColor: 'blue',
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
    backgroundColor: 'red',
  },
});
