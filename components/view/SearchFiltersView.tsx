import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from '@/constants/Layout';
import { Badge } from '@rneui/themed';
import IconView from './IconView';
import BoxView from './BoxView';
import TextView from './TextView';
import SectionManager from '@/manager/SectionManager';
import i18n from '@/translation/i18n';

const SearchFiltersView = () => {
  const router = useRouter();
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);

  const renderResultsCount = () => {
    if (Object.keys(searchState.searchFilters).length > 0 || searchState.searchValue.length > 0) {
      let resultsCount: number = JSON.parse(searchState.currentResults)?.jam?.length;

      return <Badge value={resultsCount} />;
    }
  };

  return (
    <TouchableOpacity onPress={() => SectionManager.push(router, 'search-filters')} style={styles.searchFilters}>
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
