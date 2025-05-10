import { useRef } from "react";
import { StyleSheet, FlatList } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Config } from "@/constants/Config";
import ScreenManager from "@/manager/ScreenManager";

type Props = BaseProps & {
  data: any;
  numColumns?: number;
  scrollEnabled?: boolean;
  horizontal?: boolean;
  contentContainerStyle?: object;
  columnWrapperStyle?: object;
  showsHorizontalScrollIndicator?: boolean;
  emptyMessage?: any;
  onEndReached?: () => void;
  keyExtractor?: ((row: any) => string);
  renderItem: ((item: any) => JSX.Element);
};

const ListView = ({
  data,
  numColumns,
  scrollEnabled,
  horizontal,
  contentContainerStyle,
  columnWrapperStyle,
  showsHorizontalScrollIndicator,
  emptyMessage,
  onEndReached,
  keyExtractor,
  renderItem,
  style,
}: Props) => {

  const ref = useRef();

  return (
    <FlatList
      ref={ref}
      data={data || []}
      numColumns={numColumns || 1}
      initialNumToRender={data?.length || Config.paginationSize}
      scrollEnabled={scrollEnabled === false ? false : true}
      horizontal={horizontal === true ? horizontal : false}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      columnWrapperStyle={columnWrapperStyle}
      maxToRenderPerBatch={Config.paginationSize}
      removeClippedSubviews={true}
      windowSize={5}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={() => emptyMessage}
      onEndReached={onEndReached}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: ScreenManager.window.width,
  },
});

export default ListView;
