import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import BoxView from "./BoxView";
import TextView from "./TextView";
import ListView from "./ListView";
import StaticData from "@/constants/StaticData";
import EntityManager from "@/manager/EntityManager";
import SearchJamsList from "../list/SearchJamsList";
import SearchProfilesList from "../list/SearchProfilesList";
import SearchProjectsList from "../list/SearchProjectsList";

const SearchView = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: any) => state.search);
  const [activeTab, setActiveTab] = useState<any>('all');
  const [searchData, setSearchData] = useState<any>({});

  const toggleTab = (row: any) => {
    //dispatch(setSearchFilter(row.item.id))
    setActiveTab(row.item.id);
  };

  const updateSearchData = (data: any) => {
    let searchDataArray: any = {...searchData, ...data};
    setSearchData(searchDataArray);
  };

  const renderTab = (row: any) => {
    const tabStyle: any = row.item.id == activeTab ? styles.activeTab : {};

    return (
      <TouchableOpacity onPress={() => toggleTab(row)}>
        <View style={styles.tabItem}>
          <TextView style={tabStyle}>{row.item.label}</TextView>
        </View>
      </TouchableOpacity>
    );
  };

  if (!Object.keys(searchData?.jam || [])?.length) {
    EntityManager.listJams().then((data: any) => {
      updateSearchData({
        jam: data,
        call: data.filter((o: any) => o?.type == 'call'),
        event: data.filter((o: any) => o?.type == 'event'),
      });
    });
  }

  if (!Object.keys(searchData?.jammer || [])?.length) {
    EntityManager.listProfiles().then((data: any) => {
      updateSearchData({
        jammer: data,
        venue: data,
      });
    });
  }


  if (!Object.keys(searchData?.project || [])?.length) {
    EntityManager.listProjects().then((data: any) => {
      updateSearchData({
        project: data,
      });
    });
  }

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="space-between"
      scroll={true}
      style={Layout.screenContent}
    >
      {/* Search filters */}
      <ListView
        data={StaticData.searchTabs}
        horizontal={true}
        contentContainerStyle={styles.tabContainer}
        renderItem={(row: any) => renderTab(row)}
      />

      {/* Search jams */}
      {['all', 'jam'].includes(activeTab) && 
        <SearchJamsList idArray={searchData?.jam?.map((o: any) => o?.id)} />
      }

      {/* Search calls */}
      {['all', 'call'].includes(activeTab) && 
        <SearchJamsList idArray={searchData?.call?.map((o: any) => o?.id)} />
      }

      {/* Search jammers */}
      {['all', 'jammer'].includes(activeTab) && 
        <SearchProfilesList idArray={searchData?.jammer?.map((o: any) => o?.id)} />
      }

      {/* Search projects */}
      {['all', 'project'].includes(activeTab) && 
        <SearchProjectsList idArray={searchData?.project?.map((o: any) => o?.id)} />
      }

      {/* Search events */}
      {['all', 'event'].includes(activeTab) && 
        <SearchJamsList idArray={searchData?.event?.map((o: any) => o?.id)} />
      }

      {/* Search venues */}
      {['all', 'venue'].includes(activeTab) && 
        <SearchProfilesList idArray={searchData?.venue?.map((o: any) => o?.id)} />
      }

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
  activeTab: { 
    fontWeight: "bold",
  },
};

export default SearchView;
