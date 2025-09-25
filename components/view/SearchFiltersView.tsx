import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from '@/constants/Layout';
import { Badge } from '@rneui/themed';
import IconView from './IconView';
import BoxView from './BoxView';
import TextView from './TextView';
import i18n from '@/translation/i18n';
import ModalManager from "@/manager/ModalManager";

const SearchFiltersView = () => {
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const resultCount: any = searchState.tabResults[searchState.currentTab];


  console.log(resultCount);
  
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
          {resultCount && <Badge value={resultCount} />}
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
