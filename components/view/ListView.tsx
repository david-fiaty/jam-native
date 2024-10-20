import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from './TextView';
import { Layout } from '@/constants/Layout';
import DeviceManager from '@/classes/DeviceManager';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type Props = BaseProps & {
  data: object,
  labelField: string, 
  style?: object,
};

export default ({data, labelField, style}: Props) => {
  return (
    <FlatList 
      data={data} 
      horizontal={false}  
      contentContainerStyle={[style, styles.list]}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity>
            <View style={styles.item}>
              <TextView>{item[labelField]}</TextView>
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
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: Layout.space.base,
    borderBottomWidth: 0.76,
    borderBottomColor: Colors.primary,
  },
});
