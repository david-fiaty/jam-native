import { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
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
import SearchManager from "@/manager/SearchManager";
import SpinnerView from "./SpinnerView";

const SearchView = () => {
  const searchState = useSelector((state: any) => state.search);
  const [activeTab, setActiveTab] = useState<any>('all');
  const [searchData, setSearchData] = useState<any>({});
  const [canSearch, setCanSearch] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const previousSearchValue = useRef();

  const toggleTab = (row: any) => {
    setActiveTab(row.item.id);
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

  const getIdArray = (key: string) => {
    return searchData[key];
  };

  useEffect(() => {

    /*
    if (searchState.value?.length && searchState.value !== previousSearchValue.current) {
      setCanSearch(true);
      previousSearchValue.current = searchState.value;
    }
      */

    (async () => {
      if (searchState.value?.length) {
        setSearchData(await SearchManager.getResult(searchState.value));
      }
      else {
        setSearchData(await SearchManager.getData());
      }
      
      setIsLoaded(true);
    })();
  });

  if (!isLoaded) return <SpinnerView />;

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
        <SearchJamsList data={getIdArray('jam')} />
      }

      {/* Search calls */}
      {['all', 'call'].includes(activeTab) && 
        <SearchJamsList data={getIdArray('call')} />
      }

      {/* Search jammers */}
      {['all', 'jammer'].includes(activeTab) && 
        <SearchProfilesList data={getIdArray('jammer')} />
      }

      {/* Search projects */}
      {['all', 'project'].includes(activeTab) && 
        <SearchProjectsList data={getIdArray('project')} />
      }

      {/* Search events */}
      {['all', 'event'].includes(activeTab) && 
        <SearchJamsList data={getIdArray('event')} />
      }

      {/* Search venues */}
      {['all', 'venue'].includes(activeTab) && 
        <SearchProfilesList data={getIdArray('venue')} />
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
