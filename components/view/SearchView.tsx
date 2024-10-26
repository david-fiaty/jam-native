import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import ApiClient from "@/classes/ApiClient";
import ImageView from "./ImageView";
import BoxView from "./BoxView";
import TextView from "./TextView";
import ScreenManager from '@/classes/ScreenManager';

const tabs = [
  {
    id: 1,
    label: 'Tab 1',
  },
  {
    id: 2,
    label: 'Tab 2',
  },
  {
    id: 3,
    label: 'Tab 3',
  },
  {
    id: 4,
    label: 'Tab 4',
  },
  {
    id: 5,
    label: 'Tab 5',
  },
  {
    id: 6,
    label: 'Tab 6',
  },
  {
    id: 7,
    label: 'Tab 7',
  },
  {
    id:8,
    label: 'Tab 8',
  },
  {
    id: 9,
    label: 'Tab 9',
  },
  {
    id: 10,
    label: 'Tab 10',
  },
];

const SearchView = () => {
  const [index, setIndex] = React.useState(0);
  const jamsData = ApiClient.get("jams");
  //const projectsData = ApiClient.get("projects");

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
        contentContainerStyle={{}}
        scrollEnabled={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => renderTab(item, index)}
      />

      {/* Results */}
      <FlatList 
        data={jamsData} 
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
  tabItem: {
    padding: 10,
    margin: 0,
    backgroundColor: 'gray',
    //height: '100%',
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
