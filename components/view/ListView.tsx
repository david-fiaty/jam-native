import { StyleSheet, FlatList } from "react-native";
import { BaseProps } from "@/constants/Types";
import DeviceManager from "@/manager/DeviceManager";
import { Config } from "@/constants/Config";

type Props = BaseProps & {
  data: object;
  ref?: object;
  initialNumToRender?: number;
  initialScrollIndex?: number;
  numColumns?: number;
  scrollEnabled?: boolean;
  horizontal?: boolean;
  contentContainerStyle?: object;
  columnWrapperStyle?: object;
  keyExtractor?: ((row: any) => string);
  renderItem: ((item: any) => JSX.Element);
};

const ListView = ({
  data,
  ref,
  initialNumToRender,
  initialScrollIndex,
  numColumns,
  scrollEnabled,
  horizontal,
  contentContainerStyle,
  columnWrapperStyle,
  keyExtractor,
  renderItem,
  style,
}: Props) => {
  return (
    <FlatList
      data={data || []}
      //ref={ref}
      numColumns={numColumns || 1}
      initialNumToRender={initialNumToRender || Config.paginationSize}
      //initialScrollIndex={initialScrollIndex}
      scrollEnabled={scrollEnabled === false ? false : true}
      horizontal={horizontal === true ? horizontal : false}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      columnWrapperStyle={columnWrapperStyle}
      maxToRenderPerBatch={Config.paginationSize}
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
