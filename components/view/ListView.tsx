import { StyleSheet, View, FlatList, Touchable, TouchableOpacity } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from './TextView';
import { Layout } from '@/constants/Layout';
import DeviceManager from '@/classes/DeviceManager';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
    //backgroundColor: 'blue',
    //gap: Layout.space.base,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //gap: Layout.space.base,
    padding: Layout.space.base,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.primary,
  },
});
