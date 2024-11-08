import { StyleSheet, FlatList } from 'react-native';
import { BaseProps } from '@/constants/Types';
import DeviceManager from '@/classes/DeviceManager';

type Props = BaseProps & {
  data: object,
  ref?: object,
  numColumns?: number,
  scrollEnabled?: boolean,
  horizontal?: boolean,
  contentContainerStyle?: object,
  columnWrapperStyle?: object,
  keyExtractor: object, 
  renderItem: object, 
};

const ListView = ({data, ref, numColumns, scrollEnabled, horizontal, contentContainerStyle, columnWrapperStyle, keyExtractor, renderItem, style}: Props) => {
  return (
    <FlatList 
      data={data || []} 
      ref={ref} 
      numColumns={numColumns || 1}
      scrollEnabled={scrollEnabled === false ? false : true}
      horizontal={horizontal === true ? horizontal : false}  
      contentContainerStyle={[styles.container, contentContainerStyle]}
      columnWrapperStyle={columnWrapperStyle}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      removeClippedSubviews={true}
      windowSize={5}
      keyExtractor={keyExtractor}
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