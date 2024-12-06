import { useState, useEffect } from 'react';
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFilter } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import ImageView from "./ImageView";
import BoxView from "./BoxView";
import TextView from "./TextView";
import ScreenManager from '@/manager/ScreenManager';
import i18n from "@/translation/i18n";
import { Colors } from "@/constants/Colors";
import ListView from "./ListView";
import DataManager from "@/manager/DataManager";
import { Config } from '@/constants/Config';
import SpinnerView from './SpinnerView';

const tabs = [
  {
    id: 'all',
    label: i18n.t('All'),
    numColumns: 2,
  },
  {
    id: 'calls',
    label: i18n.t('Calls'),
    numColumns: 2,
  },
  {
    id: 'jammers',
    label: i18n.t('Jammers'),
    numColumns: 1,
  },
  {
    id: 'jams',
    label: i18n.t('Jams'),
    numColumns: 2,
  },
  {
    id: 'projects',
    label: i18n.t('Projects'),
    numColumns: 2,
  },
  {
    id: 'events',
    label: i18n.t('Events'),
    numColumns: 2,
  },
  {
    id: 'venues',
    label: i18n.t('Venues'),
    numColumns: 2,
  },
];

const numColumns = 3;

const SearchView = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: any) => state.search);
  const [data, setData] = useState([]);

  const renderTab = (row: any) => (
    <TouchableOpacity onPress={() => dispatch(setSearchFilter(row.item.id))}>
      <View style={styles.tabItem}>
        <TextView style={searchState.filter == row.item.id ? {fontWeight: 'bold'} : {}}>
          {row.item.label}
        </TextView>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    (async () => {
      const listData: any = await DataManager.get(searchState.filter);

      if (listData) {
        setTimeout(() => {
          setData(listData);
        }, Layout.animation.duration);
      }
    })();
  });

  if (!data) return <SpinnerView />

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
        data={tabs}
        horizontal={true}
        contentContainerStyle={styles.tabContainer}
        renderItem={(row: any) => renderTab(row)}
      />

      {/* Results */}
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
                  uri={Config.imageUrl + row.item?.medias?.[0]?.url} 
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
    //width: 96.7,
    //height: 96.7,
  },
};

export default SearchView;
