import { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import ApiClient from "@/classes/ApiClient";
import ImageView from "./ImageView";
import BoxView from "./BoxView";
import TextView from "./TextView";
import ScreenManager from '@/classes/ScreenManager';
import i18n from "@/translation/i18n";
import { Colors } from "@/constants/Colors";

const tabs = [
  {
    id: 1,
    label: i18n.t('All'),
    items: ApiClient.get('jams'),
    numColumns: 2,
  },
  {
    id: 2,
    label: i18n.t('Calls'),
    items: [],
    numColumns: 2,
  },
  {
    id: 3,
    label: i18n.t('Jammers'),
    items: ApiClient.get('jammers'),
    numColumns: 1,
  },
  {
    id: 4,
    label: i18n.t('Jams'),
    items: ApiClient.get('jams'),
    numColumns: 2,
  },
  {
    id: 5,
    label: i18n.t('Projects'),
    items: ApiClient.get('projects'),
    numColumns: 2,
  },
  {
    id: 6,
    label: i18n.t('Events'),
    items: [],
    numColumns: 2,
  },
  {
    id: 7,
    label: i18n.t('Venues'),
    items: [],
    numColumns: 2,
  },
];

const SearchView = () => {
  const [index, setIndex] = useState(0);
  const numColumns = 3;

  const renderTab = (item, index) => (
    <TouchableOpacity>
      <View style={styles.tabItem}>
        <TextView>{item.label}</TextView>
      </View>
    </TouchableOpacity>
  );

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="space-between"
      scroll={true}
      style={Layout.screenContent}
    >
      {/* Tabs */}
      <FlatList
        data={tabs}
        horizontal={true}
        contentContainerStyle={styles.tabContainer}
        scrollEnabled={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => renderTab(item, index)}
      />

      {/* Results */}
      <FlatList 
        data={tabs[0].items} 
        numColumns={numColumns}
        contentContainerStyle={{gap: Layout.space.base}}
        columnWrapperStyle={{gap: Layout.space.base}}
        scrollEnabled={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity>
              <View style={styles.item}>
                <ImageView 
                  source={item.image} 
                  width="100%"
                  height="100%"
                  resizeMode="cover"
                  style={[styles.image, ScreenManager.getGridCellSize(numColumns)]}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </BoxView>
  );
};

const styles = {
  tabContainer: {
    backgroundColor: Colors.white,
  },
  tabItem: {
    padding: Layout.space.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  item: {
    flexDirection: 'column',
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
    width: 96.7,
    height: 96.7,
  },
};

export default SearchView;
