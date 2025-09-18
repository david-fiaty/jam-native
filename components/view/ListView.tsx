import { useRef } from "react";
import { StyleSheet, FlatList } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Config } from "@/constants/Config";
import ScreenManager from "@/manager/ScreenManager";

type Props = {
  data: any;
  numColumns?: number;
  scrollEnabled?: boolean;
  horizontal?: boolean;
  contentContainerStyle?: object;
  columnWrapperStyle?: object;
  showsHorizontalScrollIndicator?: boolean;
  emptyMessage?: any;
  onEndReachedThreshold?: any;
  scrollEventThrottle?: any;
  onScroll?: (event: any) => void;
  onEndReached?: () => void;
  keyExtractor?: ((row: any, index?: number) => string);
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
  onEndReachedThreshold,
  scrollEventThrottle,
  onScroll,
  onEndReached,
  keyExtractor,
  renderItem,
}: Props) => {

  const listRef = useRef<any>(null);

  return (
    <FlatList
      ref={listRef}
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
      scrollEventThrottle={scrollEventThrottle}
      onScroll={onScroll}
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={onEndReached}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={() => emptyMessage}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: ScreenManager.window.width,
  },
});

export default ListView;
