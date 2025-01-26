import { StyleSheet, FlatList } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Config } from "@/constants/Config";
import DeviceManager from "@/manager/DeviceManager";

type Props = BaseProps & {
  data: any;
  initialNumToRender?: number;
  numColumns?: number;
  scrollEnabled?: boolean;
  horizontal?: boolean;
  contentContainerStyle?: object;
  columnWrapperStyle?: object;
  emptyMessage?: any;
  keyExtractor?: ((row: any) => string);
  renderItem: ((item: any) => JSX.Element);
};

const ListView = ({
  data,
  initialNumToRender,
  numColumns,
  scrollEnabled,
  horizontal,
  contentContainerStyle,
  columnWrapperStyle,
  emptyMessage,
  keyExtractor,
  renderItem,
  style,
}: Props) => {
  return (
    <FlatList
      data={data || []}
      numColumns={numColumns || 1}
      initialNumToRender={initialNumToRender || Config.paginationSize}
      scrollEnabled={scrollEnabled === false ? false : true}
      horizontal={horizontal === true ? horizontal : false}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      columnWrapperStyle={columnWrapperStyle}
      maxToRenderPerBatch={Config.paginationSize}
      removeClippedSubviews={true}
      windowSize={5}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={() => emptyMessage}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: DeviceManager.window.width,
  },
});

export default ListView;
