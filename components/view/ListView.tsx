import { StyleSheet, FlatList } from 'react-native';
import { BaseProps } from '@/constants/Types';
import DeviceManager from '@/manager/DeviceManager';

type Props = BaseProps & {
  data: object,
  ref?: object,
  initialNumToRender?: number,
  numColumns?: number,
  scrollEnabled?: boolean,
  horizontal?: boolean,
  contentContainerStyle?: object,
  columnWrapperStyle?: object,
  keyExtractor?: object, 
  renderItem: object, 
};

const ListView = ({data, ref, initialNumToRender, numColumns, scrollEnabled, horizontal, contentContainerStyle, columnWrapperStyle, keyExtractor, renderItem, style}: Props) => {
  return (
    <FlatList 
      data={data || []} 
      ref={ref} 
      numColumns={numColumns || 1}
      initialNumToRender={initialNumToRender}
      scrollEnabled={scrollEnabled === false ? false : true}
      horizontal={horizontal === true ? horizontal : false}  
      contentContainerStyle={[styles.container, contentContainerStyle]}
      columnWrapperStyle={columnWrapperStyle}
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