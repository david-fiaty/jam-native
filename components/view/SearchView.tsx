import { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import ImageView from "./ImageView";
import BoxView from "./BoxView";
import TextView from "./TextView";
import ScreenManager from "@/manager/ScreenManager";
import i18n from "@/translation/i18n";
import ListView from "./ListView";
import DataManager from "@/manager/DataManager";
import SpinnerView from "./SpinnerView";
import MediaManager from "@/manager/MediaManager";
import StaticData from "@/constants/StaticData";
import EntityManager from "@/manager/EntityManager";

const SearchView = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: any) => state.search);
  const [jamsData, setJamsData] = useState([]);
  const numColumns = 3;

  const renderTab = (row: any) => (
    <TouchableOpacity onPress={() => dispatch(setSearchFilter(row.item.id))}>
      <View style={styles.tabItem}>
        <TextView
          style={
            searchState.filter == row.item.id ? { fontWeight: "bold" } : {}
          }
        >
          {row.item.label}
        </TextView>
      </View>
    </TouchableOpacity>
  );

  if (!jamsData?.length) {
    EntityManager.listJams().then((data: any) => {
      setJamsData(data);

      console.log(jamsData?.length);
    });
  }


  console.log("search");

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="space-between"
      scroll={true}
      style={Layout.screenContent}
    >
      {/* Tabs */}
      <ListView
        data={StaticData.searchTabs}
        horizontal={true}
        contentContainerStyle={styles.tabContainer}
        renderItem={(row: any) => renderTab(row)}
      />

      {/* Results */}
      <ListView
        data={jamsData}
        numColumns={numColumns}
        contentContainerStyle={{ gap: Layout.space.base }}
        columnWrapperStyle={{ gap: Layout.space.base }}
        scrollEnabled={false}
        renderItem={(row: any) => console.log(row)}
      />

      {/*
      <ListView
        data={data} 
        numColumns={numColumns}
        contentContainerStyle={{gap: Layout.space.base}}
        columnWrapperStyle={{gap: Layout.space.base}}
        scrollEnabled={false}
        renderItem={(row: any) => (
            <TouchableOpacity>
              <View style={styles.item}>
                <ImageView 
                  uri={MediaManager.getImageUrl(row.item?.medias?.[0]?.url)} 
                  width={96.7}
                  height={96.7}
                  resizeMode="cover"
                  style={[styles.image, ScreenManager.getGridCellSize(numColumns)]}
                />
              </View>
            </TouchableOpacity>
          )
        }
      />
      */}
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
    flexDirection: "column",
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
    //width: 96.7,
    //height: 96.7,
  },
};

export default SearchView;
