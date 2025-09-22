import { useState, useRef } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from '@/constants/Layout';
import { Badge } from '@rneui/themed';
import IconView from './IconView';
import BoxView from './BoxView';
import TextView from './TextView';
import i18n from '@/translation/i18n';
import ModalManager from "@/manager/ModalManager";

const SearchFiltersView = () => {
  const [searchResults, setSearchResults] = useState<any>({});
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef(null);
  
  const renderResultsCount = () => {
    if (Object.keys(searchState.searchFilters).length > 0 || searchState.searchValue.length > 0) {
      let resultsCount: number = getResultsCount('jam');

      return <Badge value={resultsCount} />;
    }
  };

  const getResultsCount = (key: string) => {
    let results: any = {};

    if (prevSearchState.current !== searchState) {
      results = JSON.parse(searchState.currentResults) || {};
      setSearchResults(results);
      prevSearchState.current = searchState;
    }
    else {
      results = searchResults;
    }

    return results[key].length;
  };

  return (
    <TouchableOpacity 
      onPress={() => ModalManager.toggleModal('SearchFiltersForm')} 
      style={styles.searchFilters}
    >
      <BoxView
        direction="row"
        align="center"
        justify="space-between"
      >
        <BoxView direction="row" align="center" justify="flex-start">
          <TextView>{i18n.t('Filter results')}</TextView>
          {renderResultsCount()}
        </BoxView>
        
        <IconView
          name="filter"
          theme="transparent"
          padding={0}
          size={16}
        />
      </BoxView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchFilters: {
    width: '100%',
    backgroundColor: Layout.colors.secondary,
    borderRadius: Layout.radius.round,
    padding: Layout.space.base,
  },
});

export default SearchFiltersView;
