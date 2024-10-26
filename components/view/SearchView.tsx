import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import ApiClient from "@/classes/ApiClient";
import ImageView from "./ImageView";
import BoxView from "./BoxView";
import TextView from "./TextView";

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
  //const jamsData = ApiClient.get("jams");
  //const projectsData = ApiClient.get("projects");

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
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <FlatList
        data={tabs}
        horizontal={true}
        contentContainerStyle={{ gap: Layout.space.base }}
        scrollEnabled={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => renderTab(item, index)}
      />
    </BoxView>
  );
};

const styles = {
  tabItem: {
    padding: 10,
    margin: 0,
    backgroundColor: 'green',
    height: '100%',
  },
};

export default SearchView;
