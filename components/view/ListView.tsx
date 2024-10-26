import { StyleSheet, FlatList } from 'react-native';
import { BaseProps } from '@/constants/Types';
import DeviceManager from '@/classes/DeviceManager';

type Props = BaseProps & {
  data: object,
  numColumns?: number,
  scrollEnabled?: boolean,
  horizontal?: boolean,
  contentContainerStyle?: object,
  columnWrapperStyle?: object,
  renderItem: () => JSX.Element, 
};

const ListView = ({data, numColumns, scrollEnabled, horizontal, contentContainerStyle, columnWrapperStyle, renderItem, style}: Props) => {
  return (
    <FlatList 
      data={data || []} 
      numColumns={numColumns || 1}
      scrollEnabled={scrollEnabled === false ? false : true}
      horizontal={horizontal === true ? horizontal : false}  
      contentContainerStyle={[styles.container, contentContainerStyle]}
      columnWrapperStyle={columnWrapperStyle}
      renderItem={renderItem} 
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: DeviceManager.window.width,
  },
});

export default ListView;