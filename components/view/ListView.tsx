import { StyleSheet, FlatList } from 'react-native';
import { BaseProps, ListItemProps } from '@/constants/Types';
import DeviceManager from '@/classes/DeviceManager';

type Props = BaseProps & {
  data: object,
  horizontal?: boolean,
  renderItem: () => JSX.Element, 
  style?: object,
};

export default ({data, horizontal, renderItem, style}: Props) => {
  return (
    <FlatList 
      data={data} 
      horizontal={horizontal}  
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
