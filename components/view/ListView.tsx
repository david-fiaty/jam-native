import { StyleSheet, FlatList } from 'react-native';
import { BaseProps } from '@/constants/Types';
import DeviceManager from '@/classes/DeviceManager';

type Props = BaseProps & {
  data: object,
  renderItem: (item: object, index: number) => {}, 
  style?: object,
};

export default ({data, renderItem, style}: Props) => {
  return (
    <FlatList 
      data={data} 
      horizontal={false}  
      contentContainerStyle={[style, styles.container]}
      renderItem={renderItem} 
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: DeviceManager.window.width,
  },
});
