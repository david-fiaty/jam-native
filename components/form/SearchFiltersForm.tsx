import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { setSearchFilters } from '@/redux/slices/SearchSlice';
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import i18n from '@/translation/i18n';

type Props = {

};

const SearchFiltersForm = ({ }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentFilters, setCurrentFilters] = useState<any>({});
  const [filtersConfig, setFiltersConfig] = useState<any>({});
  const appState = useSelector((state: any) => state.app);
  const searchState = useSelector((state: any) => state.search);

  const getFiltersConfig = () => {
    return {
      countries: appState.countriesData,
      sectors: appState.sectorsData,
      //subSectors: [...appState.sectorsData].map((sector: any) => sector.sub_sectors),
    };
  };

  const toggleFilters = (key: string) => {
    let searchFilters: any = { ...currentFilters };

    if (!searchFilters?.[key]?.length || searchFilters[key].length < filtersConfig[key].length) {
      searchFilters[key] = [...(filtersConfig?.[key] || [])].map((o: any) => o.id);
    }
    else {
      searchFilters[key] = [];
    }

    setCurrentFilters(searchFilters);
  };

  const toggleFilter = (key: string, value: string) => {
    let searchFilters: any = { ...currentFilters };

    if (isFilterEnabled(key, value)) {
      searchFilters[key] = searchFilters[key].filter((v: any) => v != value);
    }
    else {
      searchFilters[key] = [...(searchFilters?.[key] || []), value];
    }

    setCurrentFilters(searchFilters);
  };

  const isFilterEnabled = (key: string, value: string) => {
    return Array.isArray(currentFilters?.[key]) && currentFilters[key].includes(value);
  };

  const applyFilters = () => {
    dispatch(setSearchFilters(currentFilters));
  };

  const renderAllFiltersTag = (key: string) => {
    let isEnabled: boolean = currentFilters?.[key]?.length === filtersConfig?.[key]?.length;

    return (
      <TouchableOpacity onPress={() => toggleFilters(key)}>
        <TextView
          style={isEnabled ? styles.filterTagEnabled : styles.filterTagDisabled}
        >
          {i18n.t('All')}
        </TextView>
      </TouchableOpacity>
    );
  };

  const renderFilterTag = (key: string, item: any) => {
    let isEnabled: any = isFilterEnabled(key, item.id);
    let onPress: any = () => toggleFilter(key, item.id);

    return (
      <TouchableOpacity key={item.id} onPress={onPress}>
        <TextView
          style={isEnabled ? styles.filterTagEnabled : styles.filterTagDisabled}
        >
          {item.name}
        </TextView>
      </TouchableOpacity>
    );
  };

  const renderCountriesFilters = () => {
    let key: string = 'countries';

    return (
      <>
        <TextView style={styles.filterTitle}>
          {i18n.t('Countries')}
        </TextView>
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={styles.filterContainer}
        >
          {renderAllFiltersTag(key)}
          {(filtersConfig.countries || []).map((item: any) => renderFilterTag(key, item))}
        </BoxView>
      </>
    );
  };

  const renderSectorsFilter = () => {
    let key: string = 'sectors';

    return (
      <>
        <TextView style={styles.filterTitle}>
          {i18n.t('Industries')}
        </TextView>
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={styles.filterContainer}
        >
          {renderAllFiltersTag(key)}
          {(filtersConfig.sectors || []).map((item: any) => renderFilterTag(key, item))}
        </BoxView>
      </>
    );
  };

  const renderSubSectorsFilter = () => {
    let key: string = 'subSectors';

    return (
      <>
        <TextView style={styles.filterTitle}>
          {i18n.t('Sub Industries')}
        </TextView>
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={styles.filterContainer}
        >
          {renderAllFiltersTag(key)}
          {((filtersConfig.sectors || [])
            .filter((o: any) => currentFilters.sectors.includes(o.id))
            .map((sector: any) => {
              return sector.sub_sectors.map((subSector: any) => renderFilterTag(key, subSector) )
            })).flat()
          }
        </BoxView>
      </>
    );
  };

  useEffect(() => {
    if (!isLoaded) {
      setFiltersConfig(getFiltersConfig())
      setCurrentFilters(searchState.searchFilters);
      setIsLoaded(true);
    }
  }, [searchState, isLoaded]);

  console.log(currentFilters);

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={[Layout.formContainer, styles.container]}
    >
      <BoxView direction="column" style={[Layout.formContainer, styles.formContainer]}>
        {renderCountriesFilters()}
        {renderSectorsFilter()}
        {!!currentFilters?.sectors?.length && renderSubSectorsFilter()}
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    maxWidth: '100%',
    flexShrink: 1,
    paddingTop: Layout.space.base,
  },
  filterContainer: {
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: Layout.space.base * 2,
  },
  filterTitle: {
    color: Layout.colors.black,
    fontSize: 14,
  },
  filterTagDisabled: {
    backgroundColor: Layout.colors.gray,
    color: Layout.colors.primary,
    borderRadius: Layout.radius.round,
    paddingVertical: Layout.space.base,
    paddingHorizontal: Layout.space.base,
  },
  filterTagEnabled: {
    backgroundColor: Layout.colors.primary,
    color: Layout.colors.white,
    borderRadius: Layout.radius.round,
    paddingVertical: Layout.space.base,
    paddingHorizontal: Layout.space.base,
  },
});

export default SearchFiltersForm;
