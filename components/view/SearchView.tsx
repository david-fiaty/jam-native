import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, toggleSearchField } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import BoxView from "./BoxView";
import TextView from "./TextView";
import ListView from "./ListView";
import StaticData from "@/constants/StaticData";
import SearchJamsList from "../list/SearchJamsList";
import SearchProfilesList from "../list/SearchProfilesList";
import SearchProjectsList from "../list/SearchProjectsList";
import SearchManager from "@/manager/SearchManager";
import SpinnerView from "./SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import SearchField from "../field/SearchField";
import InputTextField from "../field/InputTextField";
import i18n from "@/translation/i18n";
import IconView from "./IconView";

const modalSize: any = ScreenManager.getModalSize();

const SearchView = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<any>(null);
  const [searchData, setSearchData] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const searchState = useSelector((state: any) => state.search);
  const [currentSearchValue, setCurrentSearchValue] = useState<any>('');
  const activeModal = ScreenManager.getActiveModal();
  //const isExpanded = searchState.expanded === true;

  const onSubmitEditing = async () => {
    dispatch(setSearchValue(currentSearchValue));
    await SearchManager.loadData(currentSearchValue);
  };

  const onChangeText = async (value: string) => {
    setCurrentSearchValue(value);
    dispatch(setSearchValue(value));
    await SearchManager.loadData(value);
  };

  const clearSearch = () => {
    setCurrentSearchValue('');
    dispatch(setSearchValue(''));
  };

  const openSearch = () => {
    ScreenManager.toggleModal('SearchView');
  };

  const renderRightIcon = () => {
    if (searchState.value.length > 0) {
      return (
        <IconView 
          name="delete" 
          theme="primary" 
          size={13}
          onPress={clearSearch}
        />
      );
    }

    return <></>;
  };

  const renderTab = (row: any) => {
    const tabStyle: any = row.item.id == activeTab ? styles.activeTab : {};

    return (
      <TouchableOpacity onPress={() => setActiveTab(row.item.id)} style={styles.tabItem}>
        <View>
          <TextView style={tabStyle}>{row.item.label}</TextView>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (!activeTab) setActiveTab(StaticData.searchTabs[0].id);

    (async () => {
      setSearchData(await SearchManager.getResult(searchState.value));
      setIsLoaded(true);
    })();
  }, [isLoaded, activeTab, searchState]);

  if (!isLoaded) return <SpinnerView />;
  
  return (
    <BoxView
      direction="column"
      align="flex-start"
      scroll={true}
      style={[Layout.screenContent, styles.container]}
    >

      {/* Search field */}
      <BoxView direction="row" align="center" justify="flex-start">
        <InputTextField 
          //value={currentSearchValue}
          placeholder={ i18n.t('Search...')}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          rightIcon={renderRightIcon()}
        /> 
      </BoxView>

      {/* Search filters */}
      <BoxView direction="row" align="center" justify="flex-start">
        <ListView
          data={StaticData.searchTabs}
          horizontal={true}
          contentContainerStyle={styles.tabContainer}
          renderItem={(row: any) => renderTab(row)}
        />
      </BoxView>

      {/* Search jams */}
      {['jam'].includes(activeTab) && 
        <SearchJamsList data={searchData?.jam} />
      }

      {/* Search calls */}
      {['call'].includes(activeTab) && 
        <SearchJamsList data={searchData?.call} />
      }

      {/* Search jammers */}
      {['jammer'].includes(activeTab) && 
        <SearchProfilesList data={searchData?.jammer} />
      }

      {/* Search projects */}
      {['project'].includes(activeTab) && 
        <SearchProjectsList data={searchData?.project} />
      }

      {/* Search events */}
      {['event'].includes(activeTab) && 
        <SearchJamsList data={searchData?.event} />
      }

      {/* Search venues */}
      {['venue'].includes(activeTab) && 
        <SearchProfilesList data={searchData?.venue} />
      }

    </BoxView>
  );
};

const styles = {
  container: {
    width: '100%',
    height: modalSize.height,
  },
  tabContainer: {
    backgroundColor: Colors.white,
  },
  tabItem: {
    padding: Layout.space.base,
    borderBottomWidth: Layout.borderWidth.base,
    borderBottomColor: Colors.primary,
  },
  activeTab: { 
    fontWeight: "bold",
  },
};

export default SearchView;
